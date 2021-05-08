

window.onload = async function() {
    ethereum.on('chainChanged', (_chainId) => window.location.reload());
}

function walletmodal(){
    $('#wallet-popup').modal('show');
}

async function start(){
    $('#wallet-popup').modal('hide');
    await window.ethereum.enable();
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const useraddress = await signer.getAddress();
    const polygonprovider = await new ethers.providers.JsonRpcProvider("https://rpc-mainnet.maticvigil.com/");
    const badartcontract = await new ethers.Contract( ContractAddress , abi , polygonprovider );
    const badartowner = await badartcontract.ownerOf(TokenID);
    if ( badartowner !== useraddress ){
        $('#noart').modal('show');
        return;        
    }
       
    badartURI = await badartcontract.tokenURI(TokenID);    
    badartJson = await ethers.utils.fetchJson(badartURI);
    badimage = document.getElementById("badartimage");
    badimage.src = badartJson.image;
    authors = document.getElementById("creatorinfo");
    setTimeout( function(){authors.style.opacity = "100%"; authors.style.transition = "3s"} , 1 * 1000 )
    
}

