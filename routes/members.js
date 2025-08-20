const express = require ('express')
const uuid = require ('uuid')
const route = express.Router()
const members = require('../Members')

// Import the Member model
const Member = require('../models/member_model');


// Get all members
route.get('/all_members', (req, res) => {
    let msg = 'success';
    let count = members.length;
    let status = 200;
    
    if (count === 0) {
        msg = 'No members found';
    }

    res.status(status).send({msg, count, members});
})

// add a new member
route.post('/add', async (req, res) => {
    const { name, occupation, age } = req.body;

    if (!name || !occupation || !age) {
        return res.status(400).send({ msg: 'All fields are required' });
    }
    
    try {
        // Create a new member instance using the Member model
        const newMember = new Member();
        newMember.name = name;
        newMember.occupation = occupation;
        newMember.age = age;

        // Save the new member to the database
        await newMember.save();

        res.status(201).send({ msg: 'Member added successfully', member: newMember });

    } catch (error) {
        console.error("Error adding member:", error);
        return res.status(500).send({ msg: 'Internal server error' });
    }



    // if (!name || !occupation || !age) {
    //     return res.status(400).send({ msg: 'All fields are required' });
    // }

    // const count = members.push({
    //     id: members.length + 1,
    //     name: name,
    //     occupation: occupation,
    //     age: age,
    //     isOnline: false
    // });
    // res.status(200).send({ msg: 'Member added successfully', count, members }); 
});

//Update a member
route.put('/edit', (req,res) => {
    const {name, occupation, age, id} = req.body;

    if (!id) {
        return(res.status(400).send({msg: 'id required'}))
    }

    let index = -1

    const found = members.find((member) => {
        index++
        return (member.id === id)
    })

    if (!found) {
        return (res.status(400).send({msg: "member with that id does not exist"}))
    }

    // if (name) {
    //     found.name = name
    // } else {
    //     found.name = found.name
    // }

    // name ? found.name = name : found.name = found.name

    found.name = name ? name : found.name 
    found.occupation = occupation ? occupation : found.occupation
    found.age = age ? age : found.age

    members[index] = found

    return(res.status(200).send({msg: 'Successful update', members}))
})

// Delete a member
route.delete('/delete', (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).send({ msg: 'id required' });   

    // const index = -1;

    const index = members.findIndex((member) => {
        // index++;
        return (member.id === id);
    })

    if (!index || index === -1) {
        return res.status(400).send({ msg: 'Member with that id does not exist' });
    }

    const [found] =  members.splice(index, 1);

    res.status(200).send({ msg: 'Member deleted successfully', found, members });
})


// endpoint to get a member by id
route.get('/member/:id', (req, res) => {
    const { id } = req.params;
    const member = members.find((member) => member.id == id);
    if (!member) {
        return res.status(404).send({ msg: 'Member not found' });
    }
    res.status(200).send({ msg: 'Member found', member });
});


module.exports = route;
