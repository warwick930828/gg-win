package www.bojin.com.bojin_android;

import android.annotation.TargetApi;
import android.app.Activity;
import android.app.DownloadManager;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.ClipData;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.net.Uri;
import android.net.http.SslError;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.MimeTypeMap;
import android.webkit.SslErrorHandler;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;
import android.widget.TextView;

import com.allenliu.versionchecklib.v2.AllenVersionChecker;
import com.allenliu.versionchecklib.v2.builder.UIData;
import com.google.gson.Gson;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";
    private WebView web_view;
    private ValueCallback<Uri> mUploadMessage;
    private ValueCallback<Uri[]> mUploadCallbackAboveL;
    private final static int FILECHOOSER_RESULTCODE = 202;
    private String json;
    private Gson gson;
    private ProgressDialog bar;
    private ImageView iv_launch;
    private TextView tv_versions;
    private DownloadManager downloadManager;
    private int versionCode;
    private String versionName;
    private long mTaskId;
    private String fileName = "android.zip";
    private Bean bean;
    private TreeMap<Integer, String> map = new TreeMap<>();


    public String[] DOMAIN = new String[]{
            "https://bj-c.lyyang.com/API",
            "https://bj-j.bj-6677.com/API",
            "https://bj-k.bj-6677.com/API",
            "https://bj-h.bj-6677.com/API",
            "https://www.bj-6677.com/API"
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        gson = new Gson();
        iv_launch = findViewById(R.id.iv_launch);
        tv_versions = findViewById(R.id.tv_versions);
        versionCode = Utils.getVersionCode(this);
        versionName = Utils.getVersionName(this);

        initLoad();
        init();
        initData();
    }

    private void initLoad() {
        tv_versions.setText("version " + versionName);
        bar = new ProgressDialog(this);
        bar.setMessage(getString(R.string.load));
        bar.show();
    }

    private Handler handler = new Handler();
    Runnable runnable = new Runnable() {
        @Override
        public void run() {
            PreferenceUtils.setBoolean(MainActivity.this, "first", true);
            iv_launch.setVisibility(View.GONE);
            tv_versions.setVisibility(View.GONE);
            handler.removeCallbacksAndMessages(null);
        }
    };


    private void initData() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    for (int i = 0; i < DOMAIN.length; i++) {
                        long t1 = System.nanoTime();
                        Response response = httpGet(DOMAIN[i]);
                        long t2 = System.nanoTime();
                        int duration = (int) ((t2 - t1) / 1e6d);
                        if (response == null) {
                            continue;
                        }
                        boolean successful = response.isSuccessful();

                        if (successful) {
                            if (duration < 300) {
                                //接口测速小于300毫秒终止循环直接用
                                Log.i(TAG, "1111111111111111111");
                                Log.i(TAG, DOMAIN[i]);
                                map.put(duration, DOMAIN[i]);
                                break;
                            } else {
                                map.put(duration, DOMAIN[i]);
                            }
                        } else {
                            //接口都不能用
                        }
                    }

                    Response response1 = httpGet(map.get(map.firstKey()));
                    Log.i(TAG, "firstK=" + map.firstKey());
                    Log.i(TAG, "firstV=" + map.get(map.firstKey()));
                    String json = response1.body().string();
                    Log.i(TAG, "JSON=" + json);
                    bar.dismiss();
                    Bean bean = gson.fromJson(json, Bean.class);
                    sendDataToJs(bean);

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }


    private void sendDataToJs(Bean bean) {
        this.bean = bean;
        json = gson.toJson(bean);
        boolean first = PreferenceUtils.getBoolean(this, "first");
        if (first) {
            bean.displayUpdateInfoBol = 0;
            Log.i(TAG, bean.displayUpdateInfoBol + "");
        } else {
            bean.displayUpdateInfoBol = 1;
            Log.i(TAG, bean.displayUpdateInfoBol + "");
        }

        //热更新
        int version = PreferenceUtils.getInt(this, "version");
        if (bean.androidH5Version > version) {
            Log.i(TAG, "11111111");
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Utils.showLoadingDialog(MainActivity.this, "正在更新资源", false);
                }
            });
            download(bean.androidH5Zip, bean.androidH5Version + "android.zip");
            return;
        }

        //强制更新
        if (bean.forceUpdate == 1 && versionCode < bean.androidDownLoadVersion) {
            AllenVersionChecker
                    .getInstance()
                    .downloadOnly(UIData.create()
                            .setTitle("有新版本下载")
                            .setContent(bean.content)
                            .setDownloadUrl(bean.androidStepDownLoadUrl))
                    .setForceUpdateListener(() -> {

                    })
                    .executeMission(this);
            return;
        }

        //普通更新
        if (bean.isUpdata == 1 && bean.forceUpdate == 0 && versionCode < bean.androidDownLoadVersion) {
            AllenVersionChecker
                    .getInstance()
                    .downloadOnly(UIData.create()
                            .setTitle("有新版本下载")
                            .setContent(bean.content)
                            .setDownloadUrl(bean.androidStepDownLoadUrl))
                    .setForceUpdateListener(() -> {

                    })
                    .executeMission(this);
        }
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                String url = "file:///android_asset/index.html?webview";
                web_view.getSettings().setDefaultTextEncodingName("utf-8");
                web_view.loadUrl(url);
            }
        });
    }

    private OkHttpClient httpClient = new OkHttpClient.Builder()
            .sslSocketFactory(SSLSocketClient.getSSLSocketFactory())//配置
            .hostnameVerifier(SSLSocketClient.getHostnameVerifier())//配置
            .build();

    private Response httpGet(String s) throws IOException {
        try {
            Request request = new Request.Builder()
                    .url(s + "/APP_CONFIG_SETTING")
                    .build();
            Call call = httpClient.newCall(request);
            return call.execute();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private void init() {
        web_view = this.<WebView>findViewById(R.id.web_view);

        web_view.getSettings().setJavaScriptEnabled(true);
        web_view.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        web_view.getSettings().setSupportZoom(true);
        web_view.getSettings().setBuiltInZoomControls(true);
        web_view.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);

        //数据库相关
        web_view.getSettings().setDomStorageEnabled(true);
        web_view.getSettings().setDatabaseEnabled(true);
        web_view.getSettings().setAppCacheEnabled(true);

        //视频播放相关
        web_view.getSettings().setAllowFileAccess(true);// 设置允许访问文件数据
        web_view.getSettings().setPluginState(WebSettings.PluginState.ON);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            web_view.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            CookieManager.getInstance().setAcceptThirdPartyCookies(web_view, true);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            web_view.getSettings().setAllowUniversalAccessFromFileURLs(true);
        }

        web_view.getSettings().setUseWideViewPort(true);
        web_view.getSettings().setLoadWithOverviewMode(true);
        web_view.setWebViewClient(new WebViewClient() {
            @Override
            public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
                handler.proceed();
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                Log.i(TAG, "shouldOverrideUrlLoading=" + url);

                if (url.equals("http://displayloading/")) {
                    handler.postDelayed(runnable, 0);
                    return true;
                }

                //前缀有shouyin/则代表需要跳转至新页面
                if (url.contains("/ggwinshouyin/")) {
                    String[] split = url.split("ggwinshouyin/");
                    Log.i(TAG, "拦截url=" + url);
                    Log.i(TAG, "截取url=" + split[1]);
                    Intent intent = new Intent(MainActivity.this, PayActivity.class);
                    intent.putExtra("url", split[1]);
                    startActivity(intent);
                    return true;
                }

                try {
                    Intent intent;
                    if (!url.startsWith("http://") && !url.startsWith("https://")) {
                        intent = Intent.parseUri(url, Intent.URI_INTENT_SCHEME);
                        intent.addCategory(Intent.CATEGORY_BROWSABLE);
                        intent.setComponent(null);
                        startActivity(intent);
                        return true;
                    }
                } catch (Exception e) {//防止crash (如果手机上没有安装处理某个scheme开头的url的APP, 会导致crash)
                    Log.i(TAG, "Exception=" + url);
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            Log.i(TAG, "Exception");
//                            showErrorMsg("请下载对应的支付软件后再试");
                        }
                    });
                    return true;//没有安装该app时，返回true，表示拦截自定义链接，但不跳转，避免弹出上面的错误页面
                }

                if (url.contains(".apk")) {
                    downloadByBrowser(url);
                }

                view.loadUrl(url);
                return true;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                Log.i(TAG, "onPageFinished=" + url);
                super.onPageFinished(view, url);
                Bean bean = gson.fromJson(json, Bean.class);
                web_view.loadUrl("javascript:startAndroidApp(" + "'" + bean.displayUpdateInfoBol + "'," + "'" + bean.apiUrl + "'," + "'" + gson.toJson(bean.content) + "')");


            }
        });

        web_view.setWebChromeClient(new WebChromeClient() {
            // For Android 3.0+
            public void openFileChooser(ValueCallback uploadMsg) {
                mUploadMessage = uploadMsg;
                Intent i = new Intent(Intent.ACTION_GET_CONTENT);
                i.addCategory(Intent.CATEGORY_OPENABLE);
                i.setType("image/*");
                MainActivity.this.startActivityForResult(Intent.createChooser(i, "File Chooser"),
                        FILECHOOSER_RESULTCODE);
            }


            // For Android 4.1
            public void openFileChooser(ValueCallback<Uri> uploadMsg, String acceptType, String capture) {
                mUploadMessage = uploadMsg;
                Intent i = new Intent(Intent.ACTION_GET_CONTENT);
                i.addCategory(Intent.CATEGORY_OPENABLE);
                i.setType("*/*");
                startActivityForResult(Intent.createChooser(i, "File Browser"),
                        FILECHOOSER_RESULTCODE);
            }


            // For Android 5.0+
            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback,
                                             FileChooserParams fileChooserParams) {
                mUploadCallbackAboveL = filePathCallback;
                Intent i = new Intent(Intent.ACTION_GET_CONTENT);
                i.addCategory(Intent.CATEGORY_OPENABLE);
                i.setType("*/*");
                startActivityForResult(Intent.createChooser(i, "File Browser"),
                        FILECHOOSER_RESULTCODE);
                return true;
            }
        });
    }


    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    private void onActivityResultAboveL(int requestCode, int resultCode, Intent data) {
        if (requestCode != FILECHOOSER_RESULTCODE || mUploadCallbackAboveL == null) {
            return;
        }
        Uri[] results = null;
        if (resultCode == Activity.RESULT_OK) {
            if (data != null) {
                String dataString = data.getDataString();
                ClipData clipData = data.getClipData();
                if (clipData != null) {
                    results = new Uri[clipData.getItemCount()];
                    for (int i = 0; i < clipData.getItemCount(); i++) {
                        ClipData.Item item = clipData.getItemAt(i);
                        results[i] = item.getUri();
                    }
                }
                if (dataString != null)
                    results = new Uri[]{Uri.parse(dataString)};
            }
        }
        mUploadCallbackAboveL.onReceiveValue(results);
        mUploadCallbackAboveL = null;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == FILECHOOSER_RESULTCODE) {
            if (null == mUploadMessage && null == mUploadCallbackAboveL) return;
            Uri result = data == null || resultCode != RESULT_OK ? null : data.getData();
            if (mUploadCallbackAboveL != null) {
                onActivityResultAboveL(requestCode, resultCode, data);
            } else if (mUploadMessage != null) {
                mUploadMessage.onReceiveValue(result);
                mUploadMessage = null;
            }
        }
    }

    private void downloadByBrowser(String url) {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.addCategory(Intent.CATEGORY_BROWSABLE);
        intent.setData(Uri.parse(url));
        startActivity(intent);
    }


    private void showErrorMsg(String msg) {
        new AlertDialog.Builder(this)
                .setCancelable(false)
                .setMessage(msg)
                .setPositiveButton("好的", null)
                .show();
    }


    @Override
    protected void onResume() {
        super.onResume();
        web_view.onResume();
        web_view.resumeTimers();
        Log.i(TAG, "onResume");
    }

    @Override
    protected void onPause() {
        super.onPause();
        web_view.onPause();
        web_view.pauseTimers();
        Log.i(TAG, "onPause");
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == event.KEYCODE_BACK) {//监听返回键，如果可以后退就后退
//            if (web_view.getUrl().contains("home")) {
//                this.finish();
//            }
//            if (web_view.canGoBack()) {
//                web_view.goBack();
//                Log.i(TAG, "goBack");
//                return true;
//            }
            return true;
        }
        return false;
    }


    //使用系统下载器下载
    private void download(String fileUrl, String fileName) {
        //创建下载任务
        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(fileUrl));
        request.setAllowedOverRoaming(false);//漫游网络是否可以下载

        //设置文件类型，可以在下载结束后自动打开该文件
        MimeTypeMap mimeTypeMap = MimeTypeMap.getSingleton();
        String mimeString = mimeTypeMap.getMimeTypeFromExtension(MimeTypeMap.getFileExtensionFromUrl(fileUrl));
        request.setMimeType(mimeString);

        //在通知栏中显示，默认就是显示的
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE);
        request.setVisibleInDownloadsUi(true);

        //sdcard的目录下的download文件夹，必须设置
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName);

        //将下载请求加入下载队列
        downloadManager = (DownloadManager) MainActivity.this.getSystemService(Context.DOWNLOAD_SERVICE);
        //加入下载队列后会给该任务返回一个long型的id，
        //通过该id可以取消任务，重启任务等等，看上面源码中框起来的方法
        mTaskId = downloadManager.enqueue(request);

        //注册广播接收者，监听下载状态
        this.registerReceiver(receiver, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
    }

    //广播接受者，接收下载状态
    private BroadcastReceiver receiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            checkDownloadStatus();//检查下载状态
        }
    };


    //检查下载状态
    private void checkDownloadStatus() {
        DownloadManager.Query query = new DownloadManager.Query();
        query.setFilterById(mTaskId);//筛选下载任务，传入任务ID，可变参数
        Cursor c = downloadManager.query(query);
        if (c.moveToFirst()) {
            int status = c.getInt(c.getColumnIndex(DownloadManager.COLUMN_STATUS));
            switch (status) {
                case DownloadManager.STATUS_PAUSED:
                case DownloadManager.STATUS_PENDING:
                case DownloadManager.STATUS_RUNNING:
                    break;
                case DownloadManager.STATUS_SUCCESSFUL:
                    Log.i(TAG, "下载完成");
                    //下载的zip压缩包位置
                    String downloadPath = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS) + "/" + bean.androidH5Version + fileName;
                    //解压后的文件夹保存位置
                    String absolutePath = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).getAbsolutePath();
                    try {
                        Utils.UnZipFolder(downloadPath, absolutePath);
                        String url = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).getAbsolutePath() + "/android/index.html?webview";
                        Log.i(TAG, "解压完成");
                        Log.i(TAG, url);
                        Utils.closeLoadingDialog();
                        web_view.getSettings().setDefaultTextEncodingName("utf-8");
                        web_view.loadUrl("file://" + url);
                        PreferenceUtils.setInt(this, "version", bean.androidH5Version);

                    } catch (Exception e) {
                        e.printStackTrace();
                        Log.i(TAG, e.getMessage());
                    }

                    break;
                case DownloadManager.STATUS_FAILED:

                    break;
            }
        }
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        web_view.destroy();
        web_view = null;

        Log.i(TAG, "onDestroy");
    }
}
