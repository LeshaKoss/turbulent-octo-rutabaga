package com.facebook.react.modules.microphone;

import java.util.UUID;
import java.io.IOException;
import java.io.File;

import android.util.Log;
import android.os.Environment;
import android.media.MediaRecorder;
import android.media.MediaPlayer;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class Microphone extends ReactContextBaseJavaModule {
    private String mFilename = null;
    private MediaRecorder mRecorder = null;
    private MediaPlayer mPlayer = null;
    private File audioFile = null;

    @ReactMethod
    public void startPlaying(String filename, Callback callback) {
        mPlayer = new MediaPlayer();
        try {
            mPlayer.setDataSource(filename);
            mPlayer.prepare();
            mPlayer.start();
        } catch (IOException e) {
            /*Log.e("prepare() failed");*/
        }
        callback.invoke();
    }

    @ReactMethod
    public void stopPlaying(Callback callback) {
        mPlayer.stop();
        mPlayer.release();
        mPlayer = null;
        callback.invoke();
    }

    @ReactMethod
    public void startRecording(Callback callback) throws IOException {
        mFilename = UUID.randomUUID().toString().replaceAll("-", "").concat(".3gp");

        //TODO: remove "com.instagramforsounds" hardcoded package name
        File root = new File(
            Environment.getExternalStorageDirectory(),
            "Android/data/com.instagramforsounds"
        );

        if (!root.exists()) {
            root.mkdirs();
        }
        audioFile = new File(root, mFilename);
        audioFile.createNewFile();

        mRecorder = new MediaRecorder();
        mRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
        mRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
        mRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
        mRecorder.setAudioEncodingBitRate(16);
        mRecorder.setAudioSamplingRate(44100);
        mRecorder.setOutputFile(audioFile.getAbsolutePath());

        mRecorder.prepare();
        mRecorder.start();

        callback.invoke(mFilename);

    }

    @ReactMethod
    public void stopRecording(Callback callback) {
        mRecorder.stop();
        mRecorder.release();

        mRecorder = null;
        String filename = mFilename;
        mFilename = null;
        callback.invoke(audioFile.getAbsolutePath());
    }

    @ReactMethod
    public void processTitle(String input, Callback callback) {
        callback.invoke(input.replace("LOL", "WUT"));
    }

    @Override
    public String getName() {
       return "Microphone";
    }

    public Microphone(ReactApplicationContext reactContext) {
        super(reactContext);
    }
}
