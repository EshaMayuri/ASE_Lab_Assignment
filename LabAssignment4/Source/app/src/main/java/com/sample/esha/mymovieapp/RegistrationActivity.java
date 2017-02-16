package com.sample.esha.mymovieapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegistrationActivity extends AppCompatActivity {

    public static String userEmailId= "";
    public static String userPassword= "";
    public static String name="";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);
    }
    public void Register(View v)
    {
        String validEmail= "[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}"+"\\@"+"[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}"+"("+"\\."
                +"[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}"+")+";
        EditText usernameCtrl = (EditText)findViewById(R.id.txt_username);
        EditText emailIdCtrl = (EditText)findViewById(R.id.txt_emailId);
        EditText passwordCtrl = (EditText) findViewById(R.id.txt_password);
        String userName = usernameCtrl.getText().toString();
        String emailId = emailIdCtrl.getText().toString();
        String password = passwordCtrl.getText().toString();
        if(!userName.isEmpty() && !emailId.isEmpty() && !password.isEmpty())
        {
            Matcher matcherObj = Pattern.compile(validEmail).matcher(emailId);
            if(matcherObj.matches())
            {
                Toast.makeText(getBaseContext(), "User registered successfully", Toast.LENGTH_LONG).show();
                userEmailId = emailId;
                userPassword = password;
                name = userName;
                Intent redirect = new Intent(RegistrationActivity.this, LoginActivity.class);
                startActivity(redirect);
            }
            else
            {
                Toast.makeText(getBaseContext(), "Registration Failed. Please enter valid Email Address", Toast.LENGTH_LONG).show();
            }
        }
        else if(userName.isEmpty())
        {
            Toast.makeText(getBaseContext(), "Registration Failed. Please enter a username to register.", Toast.LENGTH_LONG).show();
        }
        else if(emailId.isEmpty())
        {
            Toast.makeText(getBaseContext(), "Registration Failed. Please enter a emailID to register.", Toast.LENGTH_LONG).show();
        }
        else if(password.isEmpty())
        {
            Toast.makeText(getBaseContext(), "Registration Failed. Please enter choose a password.", Toast.LENGTH_LONG).show();
        }
    }
}
