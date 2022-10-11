import axios from 'axios'
import React, { useState, useEffect } from 'react'
import UserDashboard from './UserDashboard';



const AddUser = () => {
    const[data,setData]= useState([{}]);
    const [value,setValue]= useState("");
    

    useEffect(() => {
        getUser();
    },[])
    const getUser = async() => {
        await axios.get('http://localhost:4000/posts')
        .then((res) => setData(res.data));
        
    };

    
    const [formData,setFormData] = useState({
        nome:'',
        telefone:'',
        cidade:''
    
    });

    const [updateData,setUpdateData] = useState({
        nome:'',
        telefone:'',
        cidade:'',
        id:''
    })

  
   
    const handleFormSubmit=async(e) => {
        let response = await axios.post('http://localhost:4000/posts',formData)

        if(response) {
            alert('Cadastrado com sucesso')
        } else{
            alert('algo deu errado')
        }
        setFormData({
            nome:'',
            telefone:'',
            cidade:''

        });
        getUser();
    };
    const handleDelete = async(id) => {
        await axios.delete("http://localhost:4000/posts/"+id)
        .then((res) => alert('Deletado com sucesso'))
        getUser()
    }

    const handleUpdate = async(id) => {
        await axios.put(`http://localhost:4000/posts/${updateData.id}`,updateData)
        .then((res) => {
            alert('Usuario atualizado com sucesso')
            getUser()
        })
    }

  

    
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <form className='form-control mt-3'>
                        <h2>Cadastro de Pessoa</h2>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"></label>
                            <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="nome" value={formData.nome} onChange={(e) => setFormData({...formData,nome: e.target.value})}/>
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"></label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Telefone" value={formData.telefone} onChange={(e) => setFormData({...formData,telefone: e.target.value})}/>
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"></label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="cidade" value={formData.cidade} onChange={(e) => setFormData({...formData,cidade: e.target.value})}/>
                        </div>

                        <button className='btn btn-primary' onClick={handleFormSubmit}> Adicionar</button>
                    </form>
                    <div className='col-md-3'></div>

                       
                    
                </div>

            </div> {" "}
        
            
            <div>

            <h2 className='pt-5'>Lista de Contatos</h2>
                <table class="table table-dark table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Cidade</th>
                    <th scope="col">Ações</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                        data && data.map((user) => (
                            <tr>
                                <th scope="row">{user.id}</th>
                                <td>{user.nome}</td>
                                <td>{user.telefone}</td>
                                <td>{user.cidade}</td>
                                <td style={{display:"flex", justifyContent:"space-evenly"}}>
                                    <button className="btn btn-warning btn-md " data-bs-toggle="modal" data-bs-target="#modal" onClick={() => setUpdateData({
                                        nome:user.nome,
                                        telefone:user.telefone,
                                        cidade:user.cidade,
                                        id:user.id
                                    })}>Editar</button>
                                    <button className="btn btn-danger btn-md" onClick={()=>handleDelete (user.id)}>Deletar</button>
                                </td>
                            
                            </tr>

                        ))
                        }
    
    
                    </tbody>
                </table>
        </div>
       
           


        <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Atualizar</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"></label>
                            <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="nome" value={updateData.nome} onChange={(e) => setUpdateData({...updateData,nome: e.target.value})}/>
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"></label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Telefone" value={updateData.telefone} onChange={(e) => setUpdateData({...updateData,telefone: e.target.value})}/>
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"></label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="cidade" value={updateData.cidade} onChange={(e) => setUpdateData({...updateData,cidade: e.target.value})}/>
                        </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>handleUpdate()}>Atualizar</button>
                </div>
                </div>
            </div>
            </div>
            

        </div>
    )
}

export default AddUser