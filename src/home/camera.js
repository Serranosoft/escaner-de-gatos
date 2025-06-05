import { CameraView, useCameraPermissions } from 'expo-camera';
import { useCallback, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GalleryIcon from '../icons/gallery';
import FlipCameraIcon from '../icons/flip-camera';
import FlashIcon from '../icons/flash';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from 'expo-router';
import Button from '../components/button';
import { ui } from '../utils/styles';

export default function Camera({ setImage, setBase64 }) {

    const [cameraActive, setCameraActive] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState("back");
    const [flash, setFlash] = useState("auto");
    const ref = useRef();

    useFocusEffect(
        useCallback(() => {
            openCamera();
            return () => {
                setCameraActive(false);
            };
        }, [])
    );

    // Se está cargando el hook de permisos.
    if (!permission) {
        return <View />
    }

    // No ha aceptado los permisos.
    if (!permission.granted) {
        return (
            <View style={styles.permissionWrapper}>
                <Text style={[ui.text, { color: "#fff", textAlign: "center" }]}>Danos permisos para acceder a la cámara</Text>
                <Button text="Abrir cámara" onClick={requestPermission} />
            </View>
        );
    }



    async function openCamera() {
        // Solicitar permisos
        requestPermission();
        // Activar cámara
        setCameraActive(true);
    }


    async function takePicture() {
        const photo = await ref.current?.takePictureAsync({ base64: true });
        setBase64(photo.base64)
        setImage(photo.uri)
    }

    function reverseCamera() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    function handleFlash() {
        setFlash(current => (current === "auto" ? "on" : current === "off" ? "on" : "off"));
    }

    // Abre la galería
    async function openGallery() {

        // Solicitar permisos
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permiso denegado", "Necesitas habilitar los permisos para continuar");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setBase64(result.assets[0].base64);
        }
    }
    return (
        cameraActive &&
        <CameraView style={styles.camera} facing={facing} ref={ref} flash={flash}>
            <TouchableOpacity style={styles.takePicture} onPress={takePicture}>
                <View style={styles.takePictureInner}></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reverse} onPress={reverseCamera}>
                <FlipCameraIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.gallery} onPress={() => openGallery()}>
                <GalleryIcon />
            </TouchableOpacity>
            {
                facing === "back" &&
                <TouchableOpacity style={styles.flash} onPress={handleFlash}>
                    <FlashIcon activated={flash === "on"} />
                </TouchableOpacity>
            }
        </CameraView>
    )
}

const styles = StyleSheet.create({
    camera: {
        position: "relative",
        flex: 1,
        borderRadius: 12,
    },
    takePicture: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 32,
        left: "50%",
        transform: [{
            translateX: "-50%"
        }]
    },
    takePictureInner: {
        width: 50,
        height: 50,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: "#3DBAC2",
        position: "absolute",
        bottom: 5,
        left: "50%",
        transform: [{
            translateX: "-50%"
        }]
    },
    reverse: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 40,
        right: 24,
        backgroundColor: "rgba(0,0,0,0.75)",
        borderRadius: 100,
        padding: 24
    },
    gallery: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 40,
        left: 24,
        backgroundColor: "rgba(0,0,0,0.75)",
        borderRadius: 100,
        padding: 24

    },
    flash: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 16,
        right: 24,
        borderRadius: 100,
        backgroundColor: "rgba(0,0,0,0.75)",
    },
    permissionWrapper: {
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: "#3DBAC2",
        gap: 16,
    }

})