import React from 'react';
import Dropzone from 'react-dropzone';

export default function PaperDropzone({
  placeHolder,
  onDrop,
}) {
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>{placeHolder}</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
