import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';
import {
    Paragraph,
    Caption,
    Text,
    Divider,
    Avatar,
    Button,
    Card,
    IconButton,
    Title,
    Colors,
    Switch,
} from 'react-native-paper';

import BackArrow from '../../components/BackArrow';
import { AuthContext } from '../../services/auth';
import { local, heroku, azure } from '../../constants/api_url.json';
import { api_token } from '../../constants/token.json';

export default function PatronizeList({ route, navigation }) {

    const { userData } = React.useContext(AuthContext);

    const [pratonizeList, setPratonizeList] = useState([])
    const [isNull, setIsNull] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);


    const getUserPatronizeList = () => {
        console.log(`${azure}/users/${userData.id}/patronize`)
        try {
            axios.get(`${azure}/users/${userData.id}/patronize`, {
                headers: { Authorization: `Bearer ${api_token}` }
            })
                .then((response) => {
                    //console.log("Response>>> : " + JSON.stringify(response.data));

                    //console.log(response);
                    setPratonizeList(response.data)
                    setIsNull(false);
                })
                .catch((e) => {
                    setIsNull(true);
                    //alert("Ocorreu um erro !  >> " + e /*e.response.data.message*/);
                })
        }
        catch (e) {
            console.log(e);
        }

    }

    const deactivatePatronize = (id) => {

        try {

            axios.delete(`${azure}/patronize/${id}/deactivate`, {
                headers: { Authorization: `Bearer ${api_token}` }
            })
                .then((response) => {
                    //console.log("Response>>> : " + JSON.stringify(response.data));

                    //console.log(response);
                    alert("Apadrinhamento desativado com sucesso!");
                    getUserPatronizeList();
                })
                .catch((e) => {
                    alert("Ocorreu um erro !  >> " + e /*e.response.data.message*/);
                })
        }
        catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        getUserPatronizeList();
    }, [])

    return (

        <SafeAreaView style={{ backgroundColor: 'white', padding: 10 }}>


            <IconButton
                icon="menu"
                color={Colors.grey400}
                size={20}
                onPress={() => navigation.toggleDrawer()}
            />

            <View style={{ margin: 5 }}>
                <Title>
                    Seus apadrinhamentos cadastrados
                </Title>

                <Caption>
                    Você pode desativar apadrinhamentos que são mensais
                </Caption>
            </View>
            {
                isNull ? (
                    <View style={{justifyContent: 'center', height: '75%', margin:0}}>
                        <Card style={{width: '100%'}}>
                            <Card.Title
                                title={"Você não tem apadrinhamentos :("}
                                
                            />
                        </Card>



                    </View>
                ) :
                    (
                        <FlatList
                            style={{ width: '97%', margin: 5, marginBottom: 110 }}
                            data={pratonizeList}
                            refreshing={isRefreshing}
                            onRefresh={() => getUserPatronizeList()}
                            renderItem={({ item }) => (
                                <View>

                                    <Card style={{ borderWidth: 0.5, marginVertical: 10, paddingHorizontal: 10 }}>
                                        <Card.Title
                                            title={`${item.animal_name}`}
                                            subtitle={`${item.company_name}`}
                                            left={(props) => <Avatar.Image size={40} source={{ uri: item.image_url }} style={{ backgroundColor: 'white' }} />}
                                            right={(props) => Boolean(Number(item.monthly)) ? <IconButton {...props} icon="close" color="red" onPress={() => { deactivatePatronize(item.id) }} /> : null}
                                        />
                                        <Divider />
                                        <Caption>Status: {item.status} </Caption>
                                        <Caption>Valor: R${item.value},00 </Caption>
                                        <Caption>Renovação mensal: {Boolean(Number(item.monthly)) ? 'Sim' : 'Não'} </Caption>
                                        <Caption>Data de realização: {item.creation_date} </Caption>
                                        <Divider />
                                        <Text>Dados do pagamento </Text>
                                        <Caption>{item.user_bank_data} </Caption>
                                        <Caption>ONG {item.ong_bank_data} </Caption>
                                    </Card>

                                    </View>


                            )}
                            keyExtractor={item => item.id.toString()}
                        />

                    )
            }


        </SafeAreaView>
    )

}