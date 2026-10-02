import { useEffect, useRef, useState } from "react";
import { PenTool, Palette, Smile, Layout, Code2, Package, BookOpen, Sparkles, Search, PencilRuler, Send, Mail, Phone, Layers, ShieldCheck, FileText, CircleHelp, Video, Handshake, Clock, FolderOpen, CircleDollarSign, MessageCircle } from "lucide-react";

export function CraftIcon({ name, className = "" }: { name: string; className?: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  const key = name.toLowerCase();
  const Icon = /privacy/.test(key) ? ShieldCheck : /terms|ownership|files/.test(key) ? FileText : /question|faq/.test(key) ? CircleHelp : /consult|60 min|call/.test(key) ? Video : /pricing|scope|\$0/.test(key) ? CircleDollarSign : /timeline|process/.test(key) ? Clock : /together|fit/.test(key) ? Handshake : /selected|works|portfolio/.test(key) ? FolderOpen : /contact|conversation/.test(key) ? MessageCircle : /logo|hand-drawn/.test(key) ? PenTool : /brand identity|colour/.test(key) ? Palette : /mascot|character/.test(key) ? Smile : /development|build|code/.test(key) ? Code2 : /web|ui|interface/.test(key) ? Layout : /packaging|collateral/.test(key) ? Package : /guideline/.test(key) ? BookOpen : /discover|research|brief/.test(key) ? Search : /sketch|design|refin/.test(key) ? PencilRuler : /launch|deliver/.test(key) ? Send : /email/.test(key) ? Mail : /phone|whatsapp/.test(key) ? Phone : /system|everyday/.test(key) ? Layers : Sparkles;
  return <span ref={root} className={`craft-icon ${className}`} data-visible={visible} aria-hidden="true"><Icon size={32} strokeWidth={1.5} focusable="false" /></span>;
}
