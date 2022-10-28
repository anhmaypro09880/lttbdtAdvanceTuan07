import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { Component, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    View,
    Input,
    FlatList,
} from "react-native";
import connect1 from "../api/connect1";
import { useEffect } from "react";
// import Swipeout from "react-native-swipeout";

const FlatListIteam = ({ item, index, data, setData }) => {
    const handleRemove = (item) => {
        // console.log(item);
    };
    return (
        <View
            style={{
                height: 100,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View
                style={{
                    height: "80%",
                    width: "90%",
                    backgroundColor:
                        item.index % 2 == 0 ? "#FFFFFF" : "#E5E5E5",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            height: "100%",
                            width: "80%",
                            justifyContent: "center",
                        }}
                    >
                        <Text>{item.id}</Text>
                        <Text>{item.name}</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            // onPress={handleRemove()}
                            style={{
                                height: 40,
                                width: 60,
                                backgroundColor: "aqua",
                                borderWidth: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => {
                                console.log(item.id);
                                7;
                                fetch(
                                    "https://6348d9a30b382d796c7881ef.mockapi.io/comments" +
                                        item.id,
                                    {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    }
                                )
                                    .then(() => item)
                                    .then((item) => {
                                        setData(
                                            data.filter((ite) => ite !== item)
                                        );
                                        // console.log(list);
                                    });
                            }}
                        >
                            <Text>DELETE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default function ToDoList() {
    const [refresh, setRefresh] = useState(false);
    const [job, setJob] = useState("");
    const [name, setName] = useState("");
    const [jobs, setJobs] = useState([]);
    const [outputs, setOutputs] = useState();
    const [inputs, setInputs] = useState({
        name: "",
        id: "",
    });

    const getDataMock = async () => {
        try {
            const response = await fetch(
                "https://6348d9a30b382d796c7881ef.mockapi.io/comments"
            );
            const json = await response.json();
            setOutputs(json);
        } catch (error) {
            console.log(error);
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        getDataMock();
    }, []);

    const renderItem = ({ item, index }) => {
        return (
            <FlatListIteam
                data={outputs}
                item={item}
                index={index}
                setData={setOutputs}
            ></FlatListIteam>
        );
    };

    // console.log(jobs);
    const handleChange = (e) => {
        setInputs((prev) => [...prev, job]);
    };
    console.log(inputs);

    const addDataApi = async (data) => {
        try {
            await fetch(
                "https://6348d9a30b382d796c7881ef.mockapi.io/comments",
                {
                    method: "POST", // or 'PUT'
                    data: inputs,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then(async (response) => await response.json())
                .then((todos) => {
                    getDataMock();
                    // setData(todos);
                });
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    flex: 2,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {/* <TextInput
                    style={{ borderWidth: 1 }}
                    onChange={(e) => setName(e.target.value)}
                ></TextInput> */}

                <TextInput
                    style={{ borderWidth: 1, height: 40, width: "20%" }}
                    name="id"
                    //   value={job}
                    onChangeText={(text) => setInputs({ ...inputs, id: text })}
                ></TextInput>
                <TextInput
                    style={{ borderWidth: 1, height: 40, width: "20%" }}
                    //   value={job}
                    name="name"
                    onChangeText={(text) =>
                        setInputs({ ...inputs, name: text })
                    }
                ></TextInput>
                <TouchableOpacity onPress={addDataApi}>
                    <Image
                        style={{ height: 40, width: 40 }}
                        source={require("../assets/add.png")}
                    ></Image>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 10 }}>
                <FlatList
                    data={outputs}
                    renderItem={renderItem}
                    // renderItem={({ item, index }) => {
                    //     return (
                    //         <FlatListIteam
                    //             item={item}
                    //             index={index}
                    //             keyExtractor={(item) => item.id}
                    //         ></FlatListIteam>
                    //     );
                    // }}
                ></FlatList>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,
    },
});
