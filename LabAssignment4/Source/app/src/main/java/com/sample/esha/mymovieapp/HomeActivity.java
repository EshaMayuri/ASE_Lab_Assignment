package com.sample.esha.mymovieapp;
import android.os.StrictMode;
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
import java.util.ArrayList;
import java.util.HashMap;

import android.widget.ImageView;
import android.os.StrictMode;
import android.os.AsyncTask;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class HomeActivity extends AppCompatActivity {


    public static String videoIdNumber = "";
    String sourceText;
    TextView result1;
    TextView result2;
    TextView result3;
    TextView result4;
    TextView result5;
    Context mContext;
    String URL="";
    ArrayList<HashMap<String, String>> formList = new ArrayList<HashMap<String, String>>();
    HashMap<String, String> m_li;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        result1 = (TextView) findViewById(R.id.txt_Result1);
        result2 = (TextView) findViewById(R.id.txt_Result2);
        result3 = (TextView) findViewById(R.id.txt_Result3);
        result4 = (TextView) findViewById(R.id.txt_Result4);
        result5 = (TextView) findViewById(R.id.txt_Result5);
    }
    public void logout(View v) {
        Intent redirect = new Intent(HomeActivity.this, LoginActivity.class);
        startActivity(redirect);
    }

    public void Search(View v) {
        TextView sourceTextView = (TextView) findViewById(R.id.txt_Email);

        //final String url="";
        sourceText = sourceTextView.getText().toString();
        if (!sourceText.isEmpty()) {
            String getURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q="
                    + sourceText + "&type=video&key=AIzaSyAfXROrTdgS3t4UujIdYZSTfrxfF6f_R1w";
            final String response1 = "";
            OkHttpClient client = new OkHttpClient();
            try {
                Request request = new Request.Builder()
                        .url(getURL)
                        .build();
                client.newCall(request).enqueue(new Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {
                        System.out.println(e.getMessage());
                    }

                    @Override
                    public void onResponse(Call call, Response response) throws IOException {
                        final JSONObject jsonResult;
                        final String result = response.body().string();
                        try {
                            jsonResult = new JSONObject(result);
                            JSONArray convertedTextArray = jsonResult.getJSONArray("items");
                            for (int i = 0; i < 5; i++) {
                                JSONObject object = convertedTextArray.getJSONObject(i);
                                JSONObject videoDetails = object.getJSONObject("id");
                                JSONObject snippet = object.getJSONObject("snippet");
                                String videoId_value = videoDetails.getString("videoId");
                                String title_value = snippet.getString("title");
                                m_li = new HashMap<String, String>();
                                m_li.put("videoId", videoId_value);
                                m_li.put("title", title_value);
                                formList.add(m_li);
                            }

                            final String convertedText = formList.get(0).get("videoId");

                            runOnUiThread(new Runnable() {
                                @Override
                                public void run() {

                                    for (int i = 0; i < 5; i++) {
                                        if (i == 0) {
                                            (result1).setText(formList.get(0).get("title"));
                                        }
                                        if (i == 1) {
                                            (result2).setText(formList.get(1).get("title"));
                                        }
                                        if (i == 2) {
                                            (result3).setText(formList.get(2).get("title"));
                                        }
                                        if (i == 3) {
                                            (result4).setText(formList.get(3).get("title"));
                                        }
                                        if (i == 4) {
                                            (result5).setText(formList.get(4).get("title"));
                                        }

                                        result1.setOnClickListener(new View.OnClickListener() {
                                            public void onClick(View v) {
                                                videoIdNumber = formList.get(0).get("videoId");
                                                Youtube();
                                            }
                                        });
                                        result2.setOnClickListener(new View.OnClickListener() {
                                            public void onClick(View v) {
                                                videoIdNumber = formList.get(1).get("videoId");
                                                Youtube();
                                            }
                                        });
                                        result3.setOnClickListener(new View.OnClickListener() {
                                            public void onClick(View v) {
                                                videoIdNumber = formList.get(2).get("videoId");
                                                Youtube();
                                            }
                                        });
                                        result4.setOnClickListener(new View.OnClickListener() {
                                            public void onClick(View v) {
                                                videoIdNumber = formList.get(3).get("videoId");
                                                Youtube();
                                            }
                                        });
                                        result5.setOnClickListener(new View.OnClickListener() {
                                            public void onClick(View v) {
                                                videoIdNumber = formList.get(4).get("videoId");
                                                Youtube();
                                            }
                                        });
                                    }
                                }
                            });


                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                });
            }
            catch (Exception ex)
            {
                ex.printStackTrace();

            }
        } else {
            Toast.makeText(getBaseContext(), "Please enter something in search tab to proceed!", Toast.LENGTH_LONG).show();
            (result1).setText("");
            (result2).setText("");
            (result3).setText("");
            (result4).setText("");
            (result5).setText("");

        }
    }

    public void Youtube()
    {
        Intent redirect = new Intent(HomeActivity.this, PageLoadActivity.class);
        startActivity(redirect);
    }
}
