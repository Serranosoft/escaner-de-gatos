
import { SplashScreen, Tabs } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../../src/Context";
import CameraIcon from "../../src/icons/camera";
import FolderIcon from "../../src/icons/folder";
import { ui } from "../../src/utils/styles";
import NextResetInfo from "../../src/components/nextResetInfo";
SplashScreen.preventAutoHideAsync();

export const MAX_CREDITS = 2

export default function Layout() {

    // Carga de fuentes.
    const [fontsLoaded] = useFonts({
        "ancizar-regular": require("../../assets/fonts/AncizarSans-Regular.ttf"),
        "ancizar-medium": require("../../assets/fonts/AncizarSans-Medium.ttf"),
        "ancizar-bold": require("../../assets/fonts/AncizarSans-Bold.ttf"),
        "ancizar-extrabold": require("../../assets/fonts/AncizarSans-ExtraBold.ttf")
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    // Bool para saber si puedo analizar
    const [canAnalyze, setCanAnalyze] = useState(true);
    const [credits, setCredits] = useState(null);
    // Fecha para saber cuando va a ser el siguiente reset
    const [nextReset, setNextReset] = useState(null);
    // Imagen en formato base64 para recuperarlo durante el análisis
    const [base64, setBase64] = useState(null);

    async function getNextReset() {
        // AsyncStorage.clear();
        let nextReset = await AsyncStorage.getItem("nextReset");
        let credits = await AsyncStorage.getItem("results");

        if (nextReset !== null) {
            nextReset = new Date(parseInt(nextReset));
            nextReset.setDate(nextReset.getDate() + 1);
            if (nextReset <= new Date()) {
                await AsyncStorage.setItem("results", `${MAX_CREDITS}`);
                credits = MAX_CREDITS;
            }
            setCredits(parseInt(credits) ?? MAX_CREDITS);
        } else {
            setCredits(MAX_CREDITS)
            setCanAnalyze(true);
        }

        setNextReset(nextReset);
    }

    useEffect(() => {
        if (credits !== null) {
            if (credits > 0) {
                setCanAnalyze(true);
            } else {
                setCanAnalyze(false);
            }
        }
    }, [credits])


    // Esperar hasta que las fuentes se carguen
    if (!fontsLoaded) {
        return null;
    }

    return (
        <Context.Provider value={{ canAnalyze, setCanAnalyze, setNextReset, nextReset, base64, setBase64, getNextReset }}>
            <View style={styles.header}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={ui.text}>Créditos restantes: {credits}</Text>
                    </View>
                </View>
                <NextResetInfo light />
            </View>
            <View style={styles.container}>
                <Tabs backBehavior="history" options={{ headerShown: false }}>
                    <Tabs.Screen
                        name="index"
                        options={{
                            tabBarStyle: { backgroundColor: "#3DBAC2" },
                            tabBarLabel: "Escáner",
                            tabBarLabelStyle: { fontWeight: "bold" },
                            tabBarIcon:
                                ({ focused }) => <CameraIcon {...{ focused }} />,
                            headerShown: false,
                            tabBarActiveTintColor: "#2e2e2e",
                            tabBarInactiveTintColor: "#8a8a8a",
                        }}
                    />
                    <Tabs.Screen
                        name="records"
                        options={{
                            tabBarStyle: { backgroundColor: "#3DBAC2" },
                            tabBarLabel: "Historial",
                            tabBarLabelStyle: { fontWeight: "bold" },
                            tabBarIcon:
                                ({ focused }) => <FolderIcon {...{ focused }} />,
                            headerShown: false,
                            tabBarActiveTintColor: "#2e2e2e",
                            tabBarInactiveTintColor: "#8a8a8a",
                        }}
                    />
                </Tabs>
            </View>
        </Context.Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
    },
    header: {
        width: "100%",
        backgroundColor: "#3DBAC2",
        alignSelf: "center",
        justifyContent: "center",
        paddingVertical: 4,
        paddingLeft: 16,
        paddingHorizontal: 8,
        gap: 8,
    },
    row: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        justifyContent: "space-between"
    },
    column: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
})



