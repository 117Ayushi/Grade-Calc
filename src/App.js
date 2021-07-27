import React from 'react';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

import './App.css';
import Header from './components/Header';
import ResultChart from './components/ResultChart';


import helper from './helper';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
        method: "default",
        selectedFile: null,
        uploadData: null,
        dataHeaders: null,
        maxA: 0,
        maxAMinus: 0,
        maxB: 0,
        maxBMinus: 0,
        maxC: 0,
        maxCMinus: 0,
        maxD: 0,
        maxDMinus: 0,
        maxE: 0,
        maxEMinus: 0,
        maxF: 0,
        isDownload: false,
        mean: 0,
        median: 0,
        deviation: 0,
        min: 0,
        max: 0,
        total_grade_in_category: {},
        all_grades: ['A', 'A-', 'B', 'B-', 'C', 'C-', 'D', 'D-', 'E', 'E-', 'F'],
        chart_data: []
    }
  }

  onMaxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeMethod = (event)=>{
    event.preventDefault();
      this.setState({
          method: event.target.value
      })
  }

  onChangeFile = (event) =>{
    event.preventDefault();
      this.setState({
        selectedFile: event.target.files[0]
      })
  }

  onUpload = () => {
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
        })
    };
    reader.readAsBinaryString(this.state.selectedFile)
  }

  onDownload = (event) =>{
    event.preventDefault();

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    let dataToBePushed = this.state.uploadData
    dataToBePushed.unshift(this.state.dataHeaders)
    const ws = XLSX.utils.json_to_sheet(dataToBePushed,{skipHeader:true});
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, "output" + fileExtension);
  }

  onCalculate = (event) => {
    event.preventDefault();

    let data = this.state.uploadData

    if(this.state.method === "default"){
      data.map((item)=>{
        let grade = helper.get_grade(item[9],15,30,38,54,60,75,90,105,120,135,150)
        if(item.length < 11){
          item.push(grade)
        } else {
          item.pop()
          item.push(grade)
        }
        return item
      })
      let attributes = this.calculateOtherAttribute(data, data.length)
      this.setState({
        uploadData: data,
        isDownload: true,
        mean: attributes.mean,
        median: attributes.median,
        deviation: attributes.deviation,
        min: attributes.min,
        max: attributes.max,
        total_grade_in_category: attributes.total_grade_in_category,
        chart_data: attributes.chart_data
      },()=>{
        console.log("==== state", this.state);
        
      })
    }

    if(this.state.method === "manual"){
      data.map((item)=>{
        let grade = helper.get_grade(item[9],this.state.maxF,this.state.maxEMinus,this.state.maxE,this.state.maxDMinus,this.state.maxD,this.state.maxCMinus,this.state.maxC,this.state.maxBMinus,this.state.maxB,this.state.maxAMinus,this.state.maxA)
        if(item.length < 11){
          item.push(grade)
        } else {
          item.pop()
          item.push(grade)
        }
        return item
      })
      let attributes = this.calculateOtherAttribute(data, data.length)
      this.setState({
        uploadData: data,
        isDownload: true,
        mean: attributes.mean,
        median: attributes.median,
        deviation: attributes.deviation,
        min: attributes.min,
        max: attributes.max,
        total_grade_in_category: attributes.total_grade_in_category,
        chart_data: attributes.chart_data
      },()=>{
        console.log("==== state", this.state);
        
      })
    }

    if(this.state.method === "fuzzy"){
      data.map((item)=>{
        let grade = helper.get_grade(item[9],15,30,38,54,60,75,90,105,120,135,150)
        if(item.length < 11){
          item.push(grade)
        } else {
          item.pop()
          item.push(grade)
        }
        return item
      })
      let attributes = this.calculateOtherAttribute(data, data.length)
      this.setState({
        uploadData: data,
        isDownload: true,
        mean: attributes.mean,
        median: attributes.median,
        deviation: attributes.deviation,
        min: attributes.min,
        max: attributes.max,
        total_grade_in_category: attributes.total_grade_in_category,
        chart_data: attributes.chart_data
      },()=>{
        console.log("==== state", this.state);
        
      })
    }
    
    if(this.state.method === "relative"){
      let data_with_grade = helper.get_relative_grade(data)
      let attributes = this.calculateOtherAttribute(data_with_grade, data_with_grade.length)
      this.setState({
        uploadData: data_with_grade,
        isDownload: true,
        mean: attributes.mean,
        median: attributes.median,
        deviation: attributes.deviation,
        min: attributes.min,
        max: attributes.max,
        total_grade_in_category: attributes.total_grade_in_category,
        chart_data: attributes.chart_data
      },()=>{
        console.log("==== state", this.state);
        
      })
    }

    if(this.state.method === "fcmd"){
      data.map((item)=>{
        let grade = helper.get_percent_grade(item[9])
        if(item.length < 11){
          item.push(grade)
        } else {
          item.pop()
          item.push(grade)
        }
        return item
      })
      let attributes = this.calculateOtherAttribute(data, data.length)
      this.setState({
        uploadData: data,
        isDownload: true,
        mean: attributes.mean,
        median: attributes.median,
        deviation: attributes.deviation,
        min: attributes.min,
        max: attributes.max,
        total_grade_in_category: attributes.total_grade_in_category,
        chart_data: attributes.chart_data
      },()=>{
        console.log("==== state", this.state);
        
      })
    }
  }

  calculateOtherAttribute = (arr, n) => {
    let min = helper.arr_min(arr);
    let max = helper.arr_max(arr);
    let median = helper.arr_median(arr);
    let mean = helper.arr_mean(arr, n);
    let deviation = helper.standard_deviation(n, mean, arr);
    let total_grade_in_category = helper.total_each_grade(arr);
    let chart_data = helper.get_chart_data(total_grade_in_category, this.state.all_grades)

    return {
      min,
      max,
      median,
      mean,
      deviation,
      total_grade_in_category,
      chart_data
    }
  }

  render(){
    return (
      <div className="text-center">
        <Header />
        <div className="row">
          <div className="col-sm-8">
            {
                !(this.state.uploadData && this.state.uploadData.length > 0) ? 
                    <form className="text-center">
                        <div className="form-group files">
                            <input type="file" name="file" onChange={this.onChangeFile}/>
                        </div>
                        <button type="button" className="btn btn-primary uploadButton" onClick={this.onUpload}>Upload Excel</button>
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
                    <tbody>
                    {this.state.uploadData.map((item, index)=>{
                    return  <tr key={index}>
                                {item.map((value,i)=>{
                                    return <td key={i}>{value}</td>
                                })}
                            </tr>
                    })}
                    </tbody>
                </table>
            }
          </div>
          <div className="col-sm-4">
            {
              this.state.isDownload 
              ? <button type="button" className="btn btn-primary" onClick={this.onDownload}>Download Result</button>
              : null
            }
            <br />
            <br />
            {
              this.state.isDownload
              ? <div className="text-left">
                  <span><strong>Maximum Marks       : </strong>  {this.state.max}</span><br />
                  <span><strong>Minimum Marks       :  </strong> {this.state.min}</span><br />
                  <span><strong>Average Marks       : </strong>  {Math.floor(this.state.mean)}</span><br />
                  <span><strong>Median              : </strong>  {this.state.median}</span><br />
                  <span><strong>Standard Deviation  : </strong>  {Math.floor(this.state.deviation)}</span><br />
                </div>
              : null
            }

            <br />
            <br />
            {
              this.state.isDownload 
              ? 
              <table className="table">
                <thead className="thead-light">
                  <tr>
                      <th>GRADE</th>
                      <th>No. Of Students</th>
                  </tr>
                </thead>
                  <tbody>
                      {
                        Object.keys(this.state.total_grade_in_category).map((item, i)=>{
                          return  <tr key={i}>
                                    <td>{item}</td>
                                    <td>{this.state.total_grade_in_category[item]}</td>
                                  </tr>
                        })
                      }
                  </tbody>
              </table>
              : null
            }
            <br />
            <br />
            {
              this.state.isDownload
              ? <ResultChart data={this.state.chart_data} />
              : null
            }
            <br />
            <br />
            <form className="text-center">
              <div className="form-group">
                  <label>Choose Method: </label>
                  <select className="form-control" value={this.state.method} onChange={this.onChangeMethod}>
                      <option value="default">Default</option>
                      <option value="manual">Manual</option>
                      <option value="fuzzy">Fuzzy C-Means</option>
                      <option value="relative">Relative Grading</option>
                      <option value="fcmd">FCMD</option>
                  </select>
              </div>
              {
                this.state.method === "manual" 
                ? <div className="form-group">
                  <label>Max of Grade A : </label>
                  <input type="number" name="maxA"  className="form-control" onChange={this.onMaxChange} defaultValue={this.state.maxA} />
                </div> 
                : null
              }
              {
                this.state.method === "manual" 
                ? <div className="form-group">
                  <label>Max of Grade A- : </label>
                  <input type="number" name="maxAMinus" className="form-control" onChange={this.onMaxChange} defaultValue={this.state.maxAMinus} />
                </div> 
                : null
              }
              {
                this.state.method === "manual" 
                ? <div className="form-group">
                  <label>Max of Grade B : </label>
                  <input type="number" name="maxB" className="form-control" onChange={this.onMaxChange} defaultValue={this.state.maxB} />
                </div> 
                : null
              }
              {
                this.state.method === "manual" 
                ? <div className="form-group">
                  <label>Max of Grade B- : </label>
                  <input type="number" name="maxBMinus" className="form-control" onChange={this.onMaxChange} defaultValue={this.state.maxBMinus} />
                </div> 
                : null
              }
              {
                this.state.method === "manual" 
                ? <div className="form-group">
                  <label>Max of Grade C : </label>
                  <input type="number" name="maxC" className="form-control" onChange={this.onMaxChange} defaultValue={this.state.maxC} />
                </div> 
                : null
              }
              {
                this.state.method === "manual" 
                ? <div className="form-group">
                  <label>Max of Grade C- : </label>
                  <input type="number" name="maxCMinus" className="form-control" onChange={this.onMaxChange} defaultValue={this.state.maxCMinus} />
                </div> 
                : null
              }
              {
                this.state.method === "manual" 
                ? <div className="form-group">
                  <label>Max of Grade D : </label>
                  <input type="number" name="maxD" className="form-control" onChange={this.onMaxChange} defaultValue={this.state.maxD} />
                </div> 
                : null
              }
              {
                this.state.method === "manual" 
                ? <div className="form-group">
                  <label>Max of Grade D- : </label>
                  <input type="number" name="maxDMinus" className="form-control" onChange={this.onMaxChange} defaultValue={this.state.maxDMinus} />
                </div> 
                : null
              }
              {
                this.state.method === "manual" 
                ? <div className="form-group">
                  <label>Max of Grade E : </label>
                  <input type="number" name="maxE" className="form-control" onChange={this.onMaxChange} defaultValue={this.state.maxE} />
                </div> 
                : null
              }
              {
                this.state.method === "manual" 
                ? <div className="form-group">
                  <label>Max of Grade E- : </label>
                  <input type="number" name="maxEMinus" className="form-control" onChange={this.onMaxChange} defaultValue={this.state.maxEMinus} />
                </div> 
                : null
              }
              {
                this.state.method === "manual" 
                ? <div className="form-group">
                  <label>Max of Grade F : </label>
                  <input type="number" name="maxF" className="form-control" onChange={this.onMaxChange} defaultValue={this.state.maxF}  />
                </div> 
                : null
              }
              <button type="submit" className="btn btn-primary" onClick={this.onCalculate}>Calculate</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
