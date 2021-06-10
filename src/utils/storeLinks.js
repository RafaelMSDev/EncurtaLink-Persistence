import AsyncStorage from '@react-native-async-storage/async-storage';

//BuscarLinks
export async function getLinksSave(key){
    const myLinks = await AsyncStorage.getItem(key);

    let linksSaves = JSON.parse(myLinks) || [];

    return linksSaves;
}

//salver links storage
export async function saveLink (key, newLink){
    let linksStored = await getLinksSave(key);

    //Se tiver algum link semelhante ignorar
    const hasLink = linksStored.some( link => link.id ===newLink.id );

    if(hasLink){
        console.log('LINK JÁ EXISTENTE');
        return;//parar execução
    }

    linksStored.push(newLink);
    await AsyncStorage.setItem(key, JSON.stringify(linksStored));
    console.log('LINK SALVO');

}

//deletar link
export async function deleteLink(links, id){
    let myLinks = links.filter((item) =>{
        return(item.id !==id )
    })
    await AsyncStorage.setItem('links', JSON.stringify(links));

    console.log('ITEM DELETADO');
    return myLinks;
}