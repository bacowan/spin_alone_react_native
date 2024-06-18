package com.bacowan.spin_alone

import android.app.Activity
import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.spotify.android.appremote.api.ConnectionParams
import com.spotify.android.appremote.api.Connector
import com.spotify.android.appremote.api.SpotifyAppRemote
import com.spotify.android.appremote.api.error.SpotifyConnectionTerminatedException
import com.spotify.android.appremote.api.error.SpotifyRemoteServiceException
import com.spotify.protocol.types.Track
import com.spotify.sdk.android.auth.AuthorizationClient
import com.spotify.sdk.android.auth.AuthorizationRequest
import com.spotify.sdk.android.auth.AuthorizationResponse
import com.spotify.sdk.android.auth.LoginActivity.REQUEST_CODE


class SpotifyModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext),
    ActivityEventListener {

    private var authPromise: Promise? = null
    private var spotifyAppRemote: SpotifyAppRemote? = null

    override fun getName() = "SpotifyModule"

    init {
        reactContext.addActivityEventListener(this)
    }

    fun test() {

    }

    @ReactMethod
    fun authorize(promise: Promise) {
        this.authPromise = promise

        val builder = AuthorizationRequest.Builder(
            clientId,
            AuthorizationResponse.Type.TOKEN,
            redirectUri
        )
        builder.setScopes(arrayOf("user-read-private", "user-read-email"))
        val request = builder.build()

        AuthorizationClient.openLoginActivity(currentActivity, REQUEST_CODE, request)
    }

    override fun onActivityResult(
        activity: Activity?,
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {
        Log.d("MainActivity", "onActivityResult")
        if (requestCode == REQUEST_CODE) {
            val response = AuthorizationClient.getResponse(resultCode, data)
            when (response.type) {
                AuthorizationResponse.Type.TOKEN -> {
                    Log.d("MainActivity", "Authorized")
                    initializeSpotifyAppRemote()
                    authPromise!!.resolve(response.accessToken)
                }
                AuthorizationResponse.Type.ERROR -> {
                    Log.d("MainActivity", "error")
                    Log.d("MainActivity", response.error)
                    authPromise!!.reject(
                        "AUTH_ERROR",
                        response.error
                    )
                }
                else -> {
                    Log.d("MainActivity", "else")
                    authPromise!!.reject("AUTH_ERROR", "Unknown error")
                }
            }
        }
    }

    private fun initializeSpotifyAppRemote() {
        val connectionParams = ConnectionParams.Builder(clientId)
            .setRedirectUri(redirectUri)
            .showAuthView(true)
            .build()
        SpotifyAppRemote.connect(currentActivity, connectionParams, object : Connector.ConnectionListener {
            override fun onConnected(appRemote: SpotifyAppRemote) {
                spotifyAppRemote = appRemote
                Log.d("MainActivity", "Connected! Yay!")
                // Now you can start interacting with App Remote
                spotifyAppRemote?.let {
                    // Play a playlist
                    val playlistURI = "spotify:playlist:37i9dQZF1DX2sUQwD7tbmL"
                    it.playerApi.play(playlistURI)
                    // Subscribe to PlayerState
                    it.playerApi.subscribeToPlayerState().setEventCallback {
                        val track: Track = it.track
                        Log.d("MainActivity", track.name + " by " + track.artist.name)
                    }
                }
            }

            override fun onFailure(throwable: Throwable) {
                Log.e("MainActivity", throwable.message, throwable)
                // Something went wrong when attempting to connect! Handle errors here
            }
        })
    }

    override fun onNewIntent(intent: Intent?) {
        // No implementation needed
    }
}