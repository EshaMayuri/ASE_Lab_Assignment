package com.sample.esha.mymovieapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }

    public void SignIn(View v)
    {
        RegistrationActivity registrationActivity = new RegistrationActivity();
        String validEmail= "[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}"+"\\@"+"[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}"+"("+"\\."
                +"[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}"+")+";
        EditText emailIdCtrl_Login = (EditText)findViewById(R.id.txt_loginEmailID);
        EditText passwordCtrl_Login = (EditText) findViewById(R.id.txt_loginPassword);
        String emailId_Login = emailIdCtrl_Login.getText().toString();
        String password_login = passwordCtrl_Login.getText().toString();
        if(!emailId_Login.isEmpty() && !password_login.isEmpty())
        {
            Matcher matcherObj = Pattern.compile(validEmail).matcher(emailId_Login);
            if (matcherObj.matches())
            {
                if(registrationActivity.userEmailId.equals(emailId_Login))
                {
                    if(registrationActivity.userPassword.equals(password_login))
                    {
                        Toast.makeText(getBaseContext(), "Successful", Toast.LENGTH_LONG).show();
                        Intent redirect = new Intent(LoginActivity.this, HomeActivity.class);
                        startActivity(redirect);
                    }
                    else
                    {
                        Toast.makeText(getBaseContext(), "Incorrect password. Please enter a valid password", Toast.LENGTH_LONG).show();
                    }
                }
                else
                {
                    Toast.makeText(getBaseContext(), "Incorrect Email Id. Please enter a valid Email Id", Toast.LENGTH_LONG).show();
                }
            }
            else
            {
                Toast.makeText(getBaseContext(), "Login failed. Please enter valid Email ID", Toast.LENGTH_LONG).show();
            }
        }
    }
}
