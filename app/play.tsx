import { Text, NativeModules } from "react-native";
import { useEffect } from "react";
const { SpotifyModule } = NativeModules;
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useRoute } from '@react-navigation/native';
import '../config';
import config from "../config";

const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

export default function Play() {
    const route = useRoute();
    console.log(route.name);

    const [request, response, promptAsync] = useAuthRequest(
        {
          clientId: config.client_id,
          scopes: ['user-read-email', 'playlist-modify-public'],
          // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
          // this must be set to false
          usePKCE: false,
          redirectUri: makeRedirectUri({
            scheme: 'myapp',
            path: 'play'
          }),
        },
        discovery
      );
      
      useEffect(() => {
        if (promptAsync !== null) {
            promptAsync();
        }
      }, [promptAsync]);
    
      useEffect(() => {
        if (response?.type === 'success') {
          const { code } = response.params;
          console.log('success!');
        }
      }, [response]);

    return <Text>Hi</Text>
}