package com.sample.esha.mymovieapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.google.android.youtube.player.YouTubePlayer;
import com.google.android.youtube.player.YouTubePlayerView;
import com.google.android.youtube.player.YouTubeBaseActivity;
import com.google.android.youtube.player.YouTubeInitializationResult;

public class PageLoadActivity extends YouTubeBaseActivity {

    Button b;
    private YouTubePlayerView youTubePlayerView;
    private YouTubePlayer.OnInitializedListener onInitializedListner;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_page_load);
        youTubePlayerView = (YouTubePlayerView) findViewById(R.id.youtube_view);
        onInitializedListner = new YouTubePlayer.OnInitializedListener()
        {
            @Override
            public void onInitializationSuccess(YouTubePlayer.Provider provider, YouTubePlayer youTubePlayer, boolean b)
            {
                youTubePlayer.loadVideo(HomeActivity.videoIdNumber);
            }
            @Override
            public void onInitializationFailure(YouTubePlayer.Provider provider, YouTubeInitializationResult youTubeInitializationResult)
            {}
        };
        b = (Button) findViewById(R.id.btn_play);
        b.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                youTubePlayerView.initialize("AIzaSyAfXROrTdgS3t4UujIdYZSTfrxfF6f_R1w", onInitializedListner);
            }
        });
    }
    public void Back(View v) {
        HomeActivity.videoIdNumber = "";
        Intent redirect = new Intent(PageLoadActivity.this, HomeActivity.class);
        startActivity(redirect);
    }
}
