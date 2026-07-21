import SignatureCanvas from 'react-signature-canvas'

function Signature({sigCanvas, clearCanvas}) {
  const sigBoxContainer = {
    position: "relative",
    width: "400px",
    marginBottom: "20px"
  }
  const buttonStyle = {
    position: "Absolute",
    top: "15px",
    right: "2px"
  }

  return (
  <div style={sigBoxContainer}>
    <SignatureCanvas ref={sigCanvas} penColor='blue' canvasProps={{width: 400, height: 200, className: 'sigCanvas'}} />
    <div>
      <button onClick={clearCanvas} style={buttonStyle}>Clear</button>
      {/* <button onClick={saveCanvas}>Save Signature</button> */}
    </div>
  </div>
  )
}

export default Signature