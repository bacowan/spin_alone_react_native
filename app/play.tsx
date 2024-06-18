import { Text, NativeModules } from "react-native";
import { useEffect } from "react";
const { SpotifyModule } = NativeModules;

export default function Play() {
    useEffect(() => {
        console.log('We will invoke the native module here!');
        SpotifyModule.createCalendarEvent('testName', 'testLocation');
    }, []);

    return <Text>Hi</Text>
}