package com.sample.esha.mymovieapp;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.renderscript.ScriptGroup;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import android.os.StrictMode;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void Register(View v)
    {
        Intent redirect = new Intent(MainActivity.this, RegistrationActivity.class);
        startActivity(redirect);
    }
    public void SignIn(View view)
    {
        Intent redirect = new Intent(MainActivity.this, LoginActivity.class);
        startActivity(redirect);
    }
}
