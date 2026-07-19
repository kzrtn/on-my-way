import SignatureCanvas from 'react-signature-canvas'

function Signature({sigCanvas}) { 
  const clearCanvas = () => sigCanvas.current.clear()

  return (
    <div>
      <SignatureCanvas ref={sigCanvas} penColor='blue' canvasProps={{width: 300, height: 150, className: 'sigCanvas'}} />
      <div>
        <button onClick={clearCanvas}>Clear Signature</button>
        {/* <button onClick={saveCanvas}>Save Signature</button> */}
      </div>
    </div>
  )
}

export default Signature