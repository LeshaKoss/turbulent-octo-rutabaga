package com.facebook.react.modules.recordmodel;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.infotech.zeus.util.RestClient;
import java.io.File;

/*
 * An important note to the other developers:
 * incapsulate the caching in this class!
 * Interface shouldn't know how the model stores and processes the data.
 */
public class RecordModel extends ReactContextBaseJavaModule {
    private ReactApplicationContext context = null;
    private String URL_ROOT = "http://radiant-spire-1878.herokuapp.com/";

    @ReactMethod
    public void create(String absolutePath, String title, Callback onResponse) {
        File file = new File(absolutePath);
        RestClient client = new RestClient(URL_ROOT + "upload");
        try {
            String response = client.executePostAndSendFile(file, title);
            onResponse.invoke(response);
        } catch (Exception e) {
            e.printStackTrace();
            // onError.invoke();
        }
    }

    // TODO: ???
    @ReactMethod
    public void readById(String id, Callback onResponse) {
      onResponse.invoke(URL_ROOT + "sounds/" + id);
    }

    @ReactMethod
    public void readList(Callback onResponse) {
        RestClient client = new RestClient(URL_ROOT + "sounds");
        try {
            String response = client.executeGet();
            onResponse.invoke(response);
        } catch (Exception e) {
            e.printStackTrace();
            // onError.invoke();
        }
    }

    @ReactMethod
    public void update(Callback onInit, Callback onResponse, Callback onError) {
      // TODO:
    }

    @ReactMethod
    public void delete(Callback onInit, Callback onResponse, Callback onError) {
      // TODO:
    }

    @Override
    public String getName() {
       return "RecordModel";
    }

    public RecordModel(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }
}
