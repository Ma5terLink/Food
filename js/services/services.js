const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data            
    });
    return await res.json();
    };

// Следующая ф-я может быть написана в несколько другом синтаксисе, хотя особой значения(разницы) это не имеет..
// async function getResource(url) {
//     let res = await fetch(url);    

const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
};


export {postData};
export {getResource};