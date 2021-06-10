import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Modal} from 'react-native';

import { useIsFocused} from '@react-navigation/native';

import ModalLink from '../../components/ModalLink';
import ListItem from '../../components/ListItem';
import Menu from '../../components/Menu';
import StatusBarPage from '../../components/StatusBarPage';


import {getLinksSave, deleteLink} from '../../utils/storeLinks';

import { Container, Title, ListLinks, ContainerEmpety, WarningText} from './styles';

export default function MyLink(){

    const isFocused = useIsFocused();
    const [links, setLinks] = useState([]);
    const [data, setData]= useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        async function getLinks(){
            const result = await getLinksSave('links');
            setLinks(result);
            setLoading(false);
        }
        getLinks();
    }, [isFocused] )

    function handleItem(item){
        setData(item);
        setModalVisible(true);
    }

    async function handleDelete(id){
        const result = await deleteLink(links, id);
        setLinks(result);
    }

    return(
        <Container>
            <StatusBarPage
            barStyle="light-content"
            backgroundColor="#132742"
        />
        
        
        <Menu/>
        <Title> Meus links</Title>
        { loading && (
            <ContainerEmpety>
            <ActivityIndicator color="#FFF" size={25}  />
            </ContainerEmpety>    
        ) }  

        { links.length === 0 && (
        <ContainerEmpety>
        <WarningText> Você ainda não possui nenhum link :( </WarningText>
        </ContainerEmpety>
        ) }
        <ListLinks
        data={links}
        keyExtractor={ (item)=>String(item.id)}
        renderItem={({item}) => <ListItem data={item} selectedItem={handleItem} deleteItem={handleDelete}  /> }
        contentContainerStyle={{paddinBottom:20}}
        showVerticalScrollIndicator={false}
        />

        <Modal visible={modalVisible} transparent animationType="slide" >
            <ModalLink onClose={ () => setModalVisible(false)} data={data} />
        </Modal>

        </Container>
    )
}