import React , {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Swal from 'react-bootstrap-sweetalert';
import {Context} from './context'

const Movies = () => {
    const [status, setStatus, movies, setMovies] = useContext(Context)
	const [input, setInput] = useState({
		title: "",
		description: "",
        year: 0,
        duration: 0,
        genre: "",
        rating: 0
	})
	const [statusForm, setStatusForm] = useState("create")
    const [selectId, setSelectedId] = useState(0)
    const [alert, setAlert] = useState(null)

	useEffect(() =>{
		if(movies === null){
			axios.get(`http://backendexample.sanbercloud.com/api/movies`)
				.then(res => {
                    setMovies(res.data.map(el => {return {id: el.id, title:el.title, description:el.description, year:el.year, duration:el.duration,
                        genre: el.genre, rating: el.rating}}))
				})
		}
	})


    const handleAlertDelete = (event) => {
        let x = event.target.value
        const getAlert = () =>(
            <Swal
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                title="Delete This Movie?"
                onConfirm={() => handleDelete(x)}
                onCancel={() => hideAlert()}
                focusCancelBtn
            >
            You will not be able to recover this data!
            </Swal> 
        )
        setAlert(getAlert())
    }

	const handleDelete = (event) => {
        let id = Number(event)
		let NewMovie = movies.filter(el => el.id !== id)

		axios.delete(` http://backendexample.sanbercloud.com/api/movies/${id}`)
			.then(res => {
                console.log(res)
                setMovies([...NewMovie]) 
                handleSuccess('Success Delete Data Movie')
			})
            
	}

	const handleEdit = (event) => {
		let id = Number(event.target.value)
		let movie = movies.find(x => x.id === id)
        
        setInput({title:movie.title, description:movie.description, year:movie.year, duration:movie.duration, genre: movie.genre, rating: movie.rating})
		setSelectedId(id)
		setStatusForm("edit")
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }))
	}

    const hideAlert = () => {
        setAlert(null);
    };

    const handleError = (props)=> {
        const getAlert  = () => (<Swal 
            danger
            title = 'Error Validation'
            onConfirm = {() => hideAlert()}
        >
         {props}
        </Swal>
        )
        setAlert(getAlert())
    }

    const handleSuccess = (props) => {
        const getAlert  = () => (<Swal 
            success
            title = 'Good Job !'
            onConfirm = {() => hideAlert()}
        >
         {props}
        </Swal>
        )
        setAlert(getAlert())
    }

    const handleValidation = () => {
        let error = ''
        
        //validation title
        if(input['title'].replace(/\s/g, '') === "" || typeof input['title'] !== "string"){
            error += `Title : Error data type or can't be empty\n`
        }

        //validation description
        if(input['description'].replace(/\s/g, '') === "" ){
            error += `Description : Error cant be empty \n`
        } 

        //validation year
        input['year'] = Number(input['year'])
        if(input['year'] === 0 || typeof input['year'] !== "number"){
            error += `Year : Error data type or can't be empty \n`
        }

        //validation duration 
        input['duration'] = Number(input['duration'])
        if(input['duration'] === 0 || typeof input['duration'] !== "number"){
            error += `Duration : Error data type or can't be empty \n`
        }

        //validation genre  
        if(input['genre'].replace(/\s/g, '') === "" || typeof input['genre'] !== "string"){
            error += `Genre : Error data type or can't be empty \n`
        }

        //validation rating
        input['rating'] = Number(input['rating'])
        if(input['rating'] === 0 || typeof input['rating'] !== "number" || input['rating'] < 0 || input['rating'] >10){
            error += `Rating : Error data type (1-10) or can't be empty \n`
        }

        return error
    }

	const handleSubmit = (event) => {
        event.preventDefault()
        let error = handleValidation()
		if(!error){
            let alert = ''
			if(statusForm === "create"){
				axios.post(`http://backendexample.sanbercloud.com/api/movies`, input)
					.then(res => {
						setMovies([...movies, {id: res.data.id, title:res.data.title, description:res.data.description, year:res.data.year, duration:res.data.duration,
                            genre: res.data.genre, rating: res.data.rating}])
                    })
                alert = 'Success Create Data Movie'
			}else if(statusForm === "edit"){
				axios.put(`http://backendexample.sanbercloud.com/api/movies/${selectId}`, input)
					.then(res => {
                        let movie = movies.find(el => el.id === selectId)
                        movie['id'] =  selectId
						movie['title'] = input.title
						movie['description'] = input.description
                        movie['year'] = input.year
                        movie['duration'] = input.duration
                        movie['genre'] = input.genre
                        movie['rating'] = input.rating
						setMovies([...movies])
                    })
                alert = "Success Update Data Movie"
			}

			setStatusForm("create")
			setSelectedId(0)
			setInput({
                title: "",
                description: "",
                year: 0,
                duration: 0,
                genre: "",
                rating: 0
            })
            handleSuccess(alert)
		}else{
            handleError(error)
        }
	}

	return ( 
		<>
		<h1 style={{textAlign:"center", marginTop: '75px', marginBottom: '25px'}}>List Movie</h1>
		<table class="table table-striped" style={{width:'75%', marginLeft: 'auto', marginRight: 'auto'}}>
			<thead class = "thead-dark">
				<tr>
					<th> No </th>
					<th> Title </th>
					<th> Description </th>
					<th> Year </th>
					<th> Duration </th>
                    <th> Genre </th>
					<th> Rating </th>
                    <th> Action </th>
                </tr>
			</thead>
			{movies !== null && movies.map((el,index) =>{
				return(
					<tr key={index}>
						<td>{index+1}</td>
                        <td>{el.title}</td>
                        <td>{el.description}</td>
                        <td>{el.year}</td>
                        <td>{el.duration}</td>
                        <td>{el.genre}</td>
                        <td>{el.rating}</td>
						<td style={{display: "block", margin: "auto"}}>
							<button type="button" class="btn btn-warning" onClick={handleEdit} value={el.id}>Edit</button>
							&nbsp;
							<button type="button" class="btn btn-danger" onClick={handleAlertDelete} value ={el.id}>Delete</button>
						</td>
					</tr>
				)
			})}
		</table>
		<form onSubmit={handleSubmit} style={{width:'75%', marginLeft: 'auto', marginRight: 'auto'}}>
        <h1 style={{textAlign:"center", marginTop: '25px', marginBottom: '25px'}}>Form Movie</h1>
            <div class="row">
                <div class="col-md-4">
                    <label> Title : </label>          
                    <input class="form-control" type="text" name='title' value={input.title} onChange={handleChange} placeholder="title" />
                </div>
                <div className="col-md-4">
                    <label> Description: </label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name='description' value ={input.description} onChange={handleChange} placeholder="description" ></textarea>
                </div>
                <div className="col-md-4">
                    <label> Year: </label>
                    <input class="form-control" type="number" name='year' value={input.year} onChange={handleChange} placeholder="year ex:2000" />
                </div>
            </div>
            <div class="row" style={{marginTop:"25px"}}>
                <div className="col-md-4">
                    <label> Duration : </label>
                    <input class="form-control" type="number" name='duration' value={input.duration} onChange={handleChange} placeholder="duration in minute" />
                </div>
                <div className="col-md-4">
                    <label> Genre : </label>
                    <input class="form-control" type="text" name='genre' value={input.genre} onChange={handleChange} placeholder="genre ex:drama,horror" />
                </div>
                <div className="col-md-4">
                    <label> Rating : </label>
                    <input class="form-control" type="number" name='rating' value={input.rating} onChange={handleChange} placeholder="rating only from 1 to 10" />
                </div>
            </div>
            <button type="submit" class="btn btn-primary float-right" style={{marginTop:"25px"}}> submit </button>
            {alert}
		</form>
		</>
	);
}

export default Movies;