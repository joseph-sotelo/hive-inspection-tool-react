// Signature canvas section - separated for potential reuse
// This component could be used elsewhere in the app if needed
import SignatureCanvas from 'react-signature-canvas';
import { SIGNATURE_CANVAS } from '@/constants';

export default function SignatureSection() {
  return (
    <div id="signature-section" className="w-full flex flex-col items-center gap-3">
      <div className="text-base">Signature</div>
      <div 
        id="signature-canvas-wrapper" 
        className="bg-white inset-shadow-md rounded-2xl border-1 border-border p-2 flex items-center justify-center"
      >
        <SignatureCanvas 
          penColor={SIGNATURE_CANVAS.PEN_COLOR}
          canvasProps={{
            width: SIGNATURE_CANVAS.WIDTH, 
            height: SIGNATURE_CANVAS.HEIGHT, 
            className: 'sigCanvas'
          }} 
          backgroundColor={SIGNATURE_CANVAS.BACKGROUND_COLOR}
        />
      </div>
    </div>
  );
}