import { useRef, useCallback } from "react";
import { Bold, Italic, Underline, Type, Palette } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const FONTS = [
  "DM Sans", "Playfair Display", "Arial", "Georgia", "Times New Roman", "Verdana", "Courier New"
];

const COLORS = [
  "#000000", "#ffffff", "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b", "#6366f1",
];

const FONT_SIZES = ["1", "2", "3", "4", "5", "6", "7"];

const RichTextEditor = ({ value, onChange, placeholder = "Start typing...", minHeight = "150px" }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const execCmd = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted/30">
        <button type="button" onClick={() => execCmd("bold")} className="p-1.5 rounded hover:bg-accent transition-colors" title="Bold">
          <Bold className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => execCmd("italic")} className="p-1.5 rounded hover:bg-accent transition-colors" title="Italic">
          <Italic className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => execCmd("underline")} className="p-1.5 rounded hover:bg-accent transition-colors" title="Underline">
          <Underline className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Font family */}
        <select
          onChange={(e) => execCmd("fontName", e.target.value)}
          className="h-8 px-2 text-xs rounded border border-border bg-background text-foreground"
          title="Font"
        >
          <option value="">Font</option>
          {FONTS.map((f) => (
            <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
          ))}
        </select>

        {/* Font size */}
        <select
          onChange={(e) => execCmd("fontSize", e.target.value)}
          className="h-8 px-2 text-xs rounded border border-border bg-background text-foreground"
          title="Size"
        >
          <option value="">Size</option>
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>Size {s}</option>
          ))}
        </select>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Text color */}
        <div className="relative group">
          <button type="button" className="p-1.5 rounded hover:bg-accent transition-colors flex items-center gap-1" title="Text Color">
            <Palette className="h-4 w-4" />
            <span className="text-xs">A</span>
          </button>
          <div className="absolute top-full left-0 mt-1 p-2 rounded-lg border border-border bg-card shadow-lg hidden group-hover:grid grid-cols-6 gap-1 z-50 w-[156px]">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => execCmd("foreColor", color)}
                className="h-5 w-5 rounded-sm border border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Background color */}
        <div className="relative group">
          <button type="button" className="p-1.5 rounded hover:bg-accent transition-colors flex items-center gap-1" title="Highlight Color">
            <Type className="h-4 w-4" />
            <span className="text-xs">BG</span>
          </button>
          <div className="absolute top-full left-0 mt-1 p-2 rounded-lg border border-border bg-card shadow-lg hidden group-hover:grid grid-cols-6 gap-1 z-50 w-[156px]">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => execCmd("hiliteColor", color)}
                className="h-5 w-5 rounded-sm border border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
        className="p-4 outline-none text-foreground"
        style={{ minHeight }}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
    </div>
  );
};

export default RichTextEditor;
