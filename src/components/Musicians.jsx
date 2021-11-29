import React, { useEffect, useState } from 'react'
function Musicians() {
    const [musicians, setMusicians] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [currentAction, setCurrentAction] = useState('new');

    const handleOpenForm = (options) => {
        setOpenForm(true);
        setCurrentAction(options.action)
        if (options.action == 'edit') {
            const currentMusician = musicians.filter((f) => f._id === options.id);
            setMusician(currentMusician[0])
        }
    }

    const resetForm = () => {
        setCurrentAction('new');
        setMusicians({
            id: null,
            FirstName: '',
            TypeOfMusic: '',
            PricePerHour: '',
            profileImage: '',
        });
        setOpenForm(false);
    }
    const handleform = (event) => {
        event.preventDefault();

        if (currentAction == 'new') {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(musician)
            };
            fetch('https://bus-king.herokuapp.com/api/musicians/', requestOptions)
                .then(response => response.json())
                .then(data => {
                    resetForm();
                });
        }
        else if (currentAction == 'edit') {
            const putMethod = {
                method: 'PUT', // 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(musician)
            }



            fetch(`https://bus-king.herokuapp.com/api/musicians/${musician._id}`, putMethod)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(err => {
                    resetForm()
                })
        }
    }
    const handleDelete = (id) => {
        fetch('https://bus-king.herokuapp.com/api/musicians/' + id, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json()
            .then(res => {
                const allMusicians = musicians.filter((f) => f._id !== res._id);
                console.log(allMusicians)
                setMusicians(allMusicians)
            })
    }

    const handleChangeFile = (event) => {
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setMusician({
                ...musician,
                profileImage: reader.result
            })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }


    const [musician, setMusician] = useState({
        id: null,
        FirstName: '',
        TypeOfMusic: '',
        PricePerHour: '',
        profileImage: '',
    });

    const handleInputOnChange = e => {
        const { name, value } = e.target;
        setMusician({
            ...musician,
            [name]: value
        });
    }
    useEffect(() => {
        fetch('https://bus-king.herokuapp.com/api/musicians/')
            .then(response => response.json())
            .then(data => {
                setMusicians(data)
            });
    }, [musicians])
    return (
        <div>
            <button className="button" onClick={() => { handleOpenForm({ action: "new" }) }}>Add Musician</button>
            {
                openForm ? (
                    <div>
                        <form name="taste" onSubmit={handleform} action="#" style={{ marginBottom: '20px' }}>
                            <h1>{currentAction === 'new' ? 'Add Musicians' : 'edit Musician'}</h1>
                            <input type="text" value={musician.FirstName || ""} required name="FirstName" onChange={handleInputOnChange} placeholder="FirstName" />
                            <input type="text" value={musician.TypeOfMusic || ""} required name="TypeOfMusic" onChange={handleInputOnChange} placeholder="Type Of Music" />
                            <input type="text" value={musician.PricePerHour || ""} required name="PricePerHour" onChange={handleInputOnChange} placeholder="Price Per Hour" />
                            <input type="file" name="profileImage" onChange={handleChangeFile} placeholder="Image" />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                ) : ""
            }

            {
                musicians.length > 0 && musicians.map((musician) => {
                    return (
                        <div className="card" key={musician._id}>
                            <div className="card-body">
                                <div className="card-image">
                                    <img src={musician.profileImage} width="130px" height="130px" alt="" />
                                </div>
                                <div className="card-content">
                                    <h5>{musician.FirstName}</h5>
                                    <p>{musician.TypeOfMusic}</p>
                                    <p className="priceTag">
                                        {musician.PricePerHour} $
                                    </p>
                                    <div className="card-action">
                                        <button className="btn-classic">Book Now</button>
                                    </div>
                                </div>
                                <div className="card-controlls" style={{ marginLeft: 'auto' }}>
                                    <div onClick={() => {
                                        handleOpenForm({ action: 'edit', id: musician._id })
                                    }}>Edit</div>
                                    <div onClick={() => {
                                        handleDelete(musician._id)
                                    }}>Delete</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }



        </div>
    )
}

export default Musicians
