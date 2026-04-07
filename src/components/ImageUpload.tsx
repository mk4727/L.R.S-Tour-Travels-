import { useState, useRef } from "react";
import { Upload, Link, Image } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

const ImageUpload = ({ value, onChange, label = "Image" }: ImageUploadProps) => {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs text-muted-foreground">{label}</label>
        <div className="flex gap-1">
          <button type="button" onClick={() => setMode("url")}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all ${mode === "url" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            <Link className="h-3 w-3" /> URL
          </button>
          <button type="button" onClick={() => setMode("upload")}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all ${mode === "upload" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            <Upload className="h-3 w-3" /> Upload
          </button>
        </div>
      </div>
      {mode === "url" ? (
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://..." />
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          className="flex items-center justify-center gap-2 h-10 w-full rounded-md border border-dashed border-input bg-background px-3 py-2 text-sm text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors"
        >
          <Image className="h-4 w-4" />
          <span>Click to upload image</span>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>
      )}
      {value && (
        <img src={value} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-border" />
      )}
    </div>
  );
};

export default ImageUpload;
