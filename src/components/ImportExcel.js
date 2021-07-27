import React from 'react';
import * as XLSX from 'xlsx';
import '../App.css';


class ImportExcel extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectedFile: null,
            uploadData: null,
            dataHeaders: null
        }
    }

    onChangeHandler = (event) =>{
        event.preventDefault();
          this.setState({
            selectedFile: event.target.files[0]
          })
    }

    onClickHandler = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        var reader = new FileReader();
        reader.onload = (e) => {
            var data = e.target.result;
            let readedData = XLSX.read(data, {type: 'binary'});
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];
    
            /* Convert array to json*/
            const dataParse = XLSX.utils.sheet_to_json(ws, {header:1});
            this.setState({
                dataHeaders: dataParse[0],
                uploadData: dataParse.slice(1),
                loaded: 0
            },()=>{
                console.log(this.state);
            })
            
        };
        reader.readAsBinaryString(this.state.selectedFile)
    }


    render() {
        return (
                <div>
                {
                    !(this.state.uploadData && this.state.uploadData.length > 0) ? 
                        <form className="text-center">
                            <div className="form-group files">
                                <input type="file" name="file" onChange={this.onChangeHandler}/>
                            </div>
                            <button type="button" className="btn btn-primary uploadButton" onClick={this.onClickHandler}>Upload Excel</button>
                        </form> 
                    :
                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                            {this.state.dataHeaders.map((item, index)=>{
                                return <th key={index}>{item}</th>
                            })}
                        </tr>
                        </thead>
                        {this.state.uploadData.map((item, index)=>{
                        return  <tr key={index}>
                                    {item.map((value,i)=>{
                                        return <td key={i}>{value}</td>
                                    })}
                                </tr>
                        })}
                    </table>
                }
                </div>
        )
    }
}

export default ImportExcel