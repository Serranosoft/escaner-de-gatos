import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveRecord(image, result) {
    const today = new Date();
    const item = {
        image: image,
        date: today,
        result: JSON.stringify(result),
    }
    let records = await AsyncStorage.getItem("records");


    if (records) {
        records = JSON.parse(records);
        if (records.length > 9) {

            const allDates = records.map(item => item.date);
            const diff = allDates.map(fecha => Math.abs(new Date(fecha) - new Date(item.date)));
            const olderRecordIndex = diff.indexOf(Math.max(...diff));

            records.splice(olderRecordIndex, 1, item);
        } else {
            records.push(item);
        }
    } else {
        records = [];
        records.push(item);
    }

    await AsyncStorage.setItem("records", JSON.stringify(records));
}

export async function getRecords(setRecords) {
    const value = await AsyncStorage.getItem("records");
    if (value) {
        setRecords(JSON.parse(value));
    } else {
        setRecords([]);
    }
}