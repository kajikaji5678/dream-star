import { useEffect } from "react";
import { discordSdk } from "./discord";

export default function App() {
    useEffect(() => {
        async function connect() {
            try {
                await discordSdk.ready();
                console.log("Discord Activity Connected");
            } catch (e) {
                console.log(e);
            }
        }

        connect();
    }, []);

    return <h1>Dream-Ster</h1>
}