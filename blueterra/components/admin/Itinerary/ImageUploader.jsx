import React from "react";

export default function ImageUploader({
  label = "Upload File",
  selectedFile,
  setSelectedFile,
  accept = "image/*",
  id
}) {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]); // Store actual file object
    }
  };

  return (
    <div className="space-y-2 ">
      {/* Upload Row */}
      <div className="flex  space-x-8">
        <p className=" text-nowrap">{label}</p>

        {/* Hidden file input */}
        <input
          type="file"
          id={id}
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Browse Button */}
        <label
          htmlFor={id}
          className="px-4 border h-fit border-dark-4B w-fit bg-white cursor-pointer"
        >
          Browse
        </label>

        {/* Delete Icon */}
        {selectedFile && (
          <img
            src="/Icons/red-delete-icon.svg"
            alt="delete"
            className="cursor-pointer size-5.5 xl:size-6"
            onClick={() => setSelectedFile(null)}
          />
        )}
      </div>

      {/* Show file name */}
      {selectedFile && (
        <div className="text-sm text-sky-blue-dark">
          <p>{selectedFile.name}</p>
        </div>
      )}
    </div>
  );
}
