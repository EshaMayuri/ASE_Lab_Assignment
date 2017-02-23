package com.sample.esha.eshasandroidapplication;

import android.content.Intent;
import android.location.Address;
import android.location.Geocoder;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import java.util.List;
import java.util.Locale;

public class PageLoadActivity extends AppCompatActivity {

    private GoogleMap mMap;
    EditText address;
    GoogleMap googleMap;
    static String pageLoadAddress;
    static LatLng LatitudeLongitude = null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_page_load);
        address = (EditText) findViewById(R.id.txt_address);
    }


    public void Search(View view)
    {
        double latitude = 0.0;
        double longitude = 0.0;
        Geocoder geoCoder = new Geocoder(this, Locale.getDefault());
        mMap = googleMap;
        String addr = address.getText().toString();
        try {
            List<Address> addresses = geoCoder.getFromLocationName(addr, 1);

            for(int i = 0; i < addresses.size(); i++)
            {
                Address addr1 = addresses.get(i);
                latitude = addr1.getLatitude();
                longitude = addr1.getLongitude();
            }
            LatitudeLongitude = new LatLng(latitude, longitude);
            pageLoadAddress = addr;
            Intent redirect = new Intent(PageLoadActivity.this, MapActivity.class);
            startActivity(redirect);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }
}
