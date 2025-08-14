const BASE_URL=`${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;
// localhost:3000/pets

const index = async () => {
    try {
        const res = await fetch(BASE_URL);
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const create = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const update = async (formData, _id) => {
    try {
        const res = await fetch(`${BASE_URL}/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const deletePet = async (_id) => {
    try {
        const res = await fetch(`${BASE_URL}/${_id}`, {
            method: 'DELETE',
        });

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export {
    index,
    create,
    update,
    deletePet,
}

