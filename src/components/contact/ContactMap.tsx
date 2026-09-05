"use client";

export default function ContactMap() {
  // Google maps embed URL for Hanoi Licogi 13 location
  const hanoiMapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.6951185993516!2d105.79549357493798!3d20.998747988809313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acbb128d77db%3A0xcec8febb44b08314!2zTGljb2dpIDEzLCBQLiBWxakgSOG7r3UvMTY0IEtodeG6pXQgRHV5IFRp4bq_biwgVGhhbmggWHXDom4sIEjDoCBO4buZaSAxMDAwMDAsIFZp4buHdCBOYW0!5e1!3m2!1svi!2s!4v1787887392393!5m2!1svi!2s";
  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[680px] bg-slate-200 overflow-hidden">
      {/* Map Embed iframe */}
      <iframe
        title="SGO Vietnam Office Map"
        src={hanoiMapUrl}
        width="100%"
        height="100%"
        style={{ border: 0, filter: "contrast(1.05) saturate(1.1)" }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full object-cover"
      ></iframe>

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-slate-900/10 pointer-events-none"></div>
    </div>
  );
}
