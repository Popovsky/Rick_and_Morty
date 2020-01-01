const data = fetch('https://rickandmortyapi.com/api/character/');
data
    .then(res => res.json())
    .then(res => {
        const {pages} = res.info;
        let obj = new Object();
        let objMale = new Object();
        let objFemale = new Object();
        let objUnknown = new Object();
        let objGenderless = new Object();
        Promise.all([...new Array(pages)].map((el,i) => fetch(`https://rickandmortyapi.com/api/character/?page=${i+1}`).then(res => res.json())))
            .then(res => {
                let arr = res.map(el => el.results);
                let arrayAllObjects = [];
                arr.map(el => el.map(e => arrayAllObjects.push(e)));

                arrayAllObjects.map(el => Array.isArray(obj[el.gender]) ? obj[el.gender].push(el) : obj[el.gender] = [el]);

                obj.Male.map(el => Array.isArray(objMale[el.status]) ? objMale[el.status].push(el) : objMale[el.status] = [el]);
                obj.Female.map(el => Array.isArray(objFemale[el.status]) ? objFemale[el.status].push(el) : objFemale[el.status] = [el]);
                obj.unknown.map(el => Array.isArray(objUnknown[el.status]) ? objUnknown[el.status].push(el) : objUnknown[el.status] = [el]);
                obj.Genderless.map(el => Array.isArray(objGenderless[el.status]) ? objGenderless[el.status].push(el) : objGenderless[el.status] = [el]);

                obj.Male = objMale;
                obj.Female = objFemale;
                obj.unknown = objUnknown;
                obj.Genderless = objGenderless;
                console.log(obj);
            });
    });
