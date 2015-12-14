package com.facebook.react.modules.microphone;

import java.util.UUID;
import java.io.IOException;
import java.io.File;
import java.io.FileInputStream;

import android.util.Log;
import android.os.Environment;
import android.media.MediaRecorder;
import android.media.MediaPlayer;
import android.media.AudioManager;
import android.net.Uri;
import android.media.MediaPlayer.OnCompletionListener;
import android.content.Context;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.entity.ContentType;

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
    private ReactApplicationContext context = null;

    @ReactMethod
    public void startPlaying(String stringUri, Callback onStart) {
        final Callback onStopCallback = onStop;

        mPlayer = new MediaPlayer();
        try {
            onStart.invoke();
            Uri sourceUri = Uri.parse(stringUri);
            mPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
            mPlayer.setDataSource(context, sourceUri);
            /* mPlayer.setOnCompletionListener(new OnCompletionListener() {
                @Override
                public void onCompletion(MediaPlayer mp) {
                    onStopCallback.invoke();
                }
            }); */
            mPlayer.prepare();
            mPlayer.start();
        } catch (IOException e) {
            // onError.invoke();
        }
    }

    @ReactMethod
    public void stopPlaying(Callback onStop) {
        mPlayer.stop();
        mPlayer.release();
        mPlayer = null;
        onStop.invoke();
    }

    @ReactMethod
    public void startRecording(Callback onStart) throws IOException {
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

        onStart.invoke(audioFile.getAbsolutePath());
    }

    @ReactMethod
    public void stopRecording(Callback onStop) {
        mRecorder.stop();
        mRecorder.release();

        mRecorder = null;
        String filename = mFilename;
        mFilename = null;
        onStop.invoke(audioFile.getAbsolutePath());
    }

    @Override
    public String getName() {
       return "Microphone";
    }

    public Microphone(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }
}
