
import { useState } from 'react';
import createQpdfModule from '@neslinesli93/qpdf-wasm';

export default function ProtectPDF() {
  const [mode, setMode] = useState('protect');
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  function changeMode(nextMode) {
    setMode(nextMode);
    setFile(null);
    setPassword('');
    setConfirmPassword('');
    setMessage('');
  }

  async function processPDF() {
    if (!file) {
      setMessage('Please select a PDF file.');
      return;
    }

    if (!password) {
      setMessage('Please enter your password.');
      return;
    }

    if (mode === 'protect') {
      if (password.length < 6) {
        setMessage('Password must be at least 6 characters.');
        return;
      }

      if (password !== confirmPassword) {
        setMessage('Passwords do not match.');
        return;
      }
    }

    setLoading(true);
    setMessage('');

    try {
      const qpdf = await createQpdfModule({
        locateFile: () => '/qpdf.wasm',
        noInitialRun: true
      });

      const inputBytes = new Uint8Array(
        await file.arrayBuffer()
      );

      qpdf.FS.writeFile('/input.pdf', inputBytes);

      const args = mode === 'protect'
        ? [
            '--encrypt',
            password,
            password,
            '256',
            '--',
            '/input.pdf',
            '/output.pdf'
          ]
        : [
            '--password=' + password,
            '--decrypt',
            '/input.pdf',
            '/output.pdf'
          ];

      const result = qpdf.callMain(args);

      if (result !== 0) {
        throw new Error('PDF processing failed.');
      }

      const output = qpdf.FS.readFile('/output.pdf');

      if (!output || output.length === 0) {
        throw new Error('Output PDF is empty.');
      }

      const blob = new Blob(
        [new Uint8Array(output)],
        { type: 'application/pdf' }
      );

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      const baseName = file.name.replace(/\.pdf$/i, '');

      link.href = url;
      link.download = mode === 'protect'
        ? baseName + '_protected.pdf'
        : baseName + '_unlocked.pdf';

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 1000);

      setMessage(
        mode === 'protect'
          ? 'PDF protected successfully!'
          : 'PDF unlocked successfully!'
      );

    } catch (error) {
      console.error('PDF Tool Error:', error);
      setMessage(
        mode === 'protect'
          ? 'Unable to protect this PDF.'
          : 'Unable to unlock PDF. Check your password.'
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    padding: 12,
    width: '90%',
    maxWidth: 350,
    border: '1px solid #ccc',
    borderRadius: 8
  };

  return (
    <div
      style={{
        maxWidth: 650,
        margin: '50px auto',
        padding: 30,
        background: '#fff',
        borderRadius: 16,
        textAlign: 'center'
      }}
    >
      <h2>Protect & Unlock PDF</h2>

      <p>
        Add or remove password protection from PDF files.
      </p>

      <div style={{ margin: '22px 0' }}>
        <button
          onClick={() => changeMode('protect')}
          style={{
            background: mode === 'protect' ? '#e44747' : '#eee',
            color: mode === 'protect' ? '#fff' : '#333',
            border: 0,
            padding: '12px 20px',
            borderRadius: 8,
            cursor: 'pointer',
            marginRight: 8,
            fontWeight: 700
          }}
        >
          Protect PDF
        </button>

        <button
          onClick={() => changeMode('unlock')}
          style={{
            background: mode === 'unlock' ? '#e44747' : '#eee',
            color: mode === 'unlock' ? '#fff' : '#333',
            border: 0,
            padding: '12px 20px',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 700
          }}
        >
          Unlock PDF
        </button>
      </div>

      <input
        key={mode}
        type="file"
        accept=".pdf,application/pdf"
        onChange={e => {
          setFile(e.target.files?.[0] || null);
          setMessage('');
        }}
      />

      <div style={{ marginTop: 20 }}>
        <input
          type="password"
          placeholder={
            mode === 'protect'
              ? 'Enter New Password'
              : 'Enter Current PDF Password'
          }
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={inputStyle}
        />
      </div>

      {mode === 'protect' && (
        <div style={{ marginTop: 12 }}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={inputStyle}
          />
        </div>
      )}

      <p
        style={{
          color: '#a16207',
          background: '#fffbeb',
          padding: 12,
          borderRadius: 8,
          fontSize: 13,
          marginTop: 20
        }}
      >
        {mode === 'protect'
          ? 'Important: We do not store your PDF files or passwords. If you forget your password, we cannot recover it.'
          : 'Enter the correct password to remove PDF protection. Forgotten passwords cannot be recovered using this tool.'}
      </p>

      <button
        onClick={processPDF}
        disabled={loading}
        style={{
          background: '#e44747',
          color: '#fff',
          border: 0,
          padding: '14px 25px',
          borderRadius: 10,
          cursor: loading ? 'wait' : 'pointer',
          fontWeight: 700
        }}
      >
        {loading
          ? 'Processing...'
          : mode === 'protect'
            ? 'Protect PDF'
            : 'Unlock PDF'}
      </button>

      {message && (
        <p style={{ marginTop: 18 }}>{message}</p>
      )}
    </div>
  );
}
