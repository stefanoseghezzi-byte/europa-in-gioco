// Dati degli Stati del mondo (carta d'identità). Valori arrotondati, aggiornati a circa il 2024-2025.
// Gli Stati europei riusano i dati di paesi.js (sezione Europa); qui si aggiungono quelli degli altri continenti.
// liv: 1 = facile, 2 = medio, 3 = difficile (ogni livello include i precedenti)
// cont: continente (America divisa in settentrionale, centrale e meridionale, come nei libri di testo)
// amb: true se l'appartenenza al continente è ambigua (Stati a cavallo tra due continenti): non penalizza nei quiz sul continente.
// I confini ("Confina con") si calcolano dalla mappa (tools/build-mondo.mjs).
(function () {
  const P = [];
  const M = (id, nome, cap, liv, cont, pos, sup, ab, mon, lin, gov, chicca, nota, amb) =>
    P.push({ id, nome, cap, liv, cont, pos, sup, ab, mon, lin, gov, chicca, nota: nota || '', amb: !!amb });

  // ---------- Europa (dati presi da paesi.js) ----------
  const LIV_EU = {
    ITA: 1, FRA: 1, DEU: 1, ESP: 1, GBR: 1, RUS: 1, UKR: 1, POL: 1, GRC: 1, TUR: 1,
    PRT: 2, IRL: 2, ISL: 2, NOR: 2, SWE: 2, FIN: 2, DNK: 2, NLD: 2, BEL: 2, CHE: 2, AUT: 2, CZE: 2, HUN: 2, ROU: 2, BGR: 2, SRB: 2, BLR: 2,
  };
  const NOTE_EU = {
    RUS: 'È uno Stato a cavallo tra Europa e Asia: la capitale e la maggior parte degli abitanti sono in Europa, ma la maggior parte del territorio (la Siberia) è in Asia.',
    TUR: 'Quasi tutto il territorio (la penisola dell\'Anatolia) è in Asia; solo una piccola parte (la Tracia) è in Europa.',
    CYP: 'Geograficamente l\'isola è vicina all\'Asia, ma è membro dell\'Unione europea. I dati sono riferiti alla Repubblica di Cipro.',
  };
  window.PAESI.forEach(p => {
    const asia = p.id === 'TUR' || p.id === 'CYP';
    P.push({
      id: p.id, nome: p.nome, cap: p.cap, liv: LIV_EU[p.id] || 3, cont: asia ? 'Asia' : 'Europa', pos: p.pos, sup: p.sup, ab: p.ab,
      mon: p.mon.replace(/ \(.*\)/, ''), lin: p.lin, gov: p.gov, chicca: p.chicca, nota: NOTE_EU[p.id] || p.nota || '',
      amb: ['RUS', 'TUR', 'CYP'].includes(p.id),
    });
  });

  // ---------- Africa ----------
  const AF = 'Africa';
  M('DZA', 'Algeria', 'Algeri', 1, AF, 'Africa settentrionale, sul Mediterraneo', 2381741, 46000000, 'Dinaro algerino', 'Arabo e berbero', 'Repubblica presidenziale',
    'È il più grande Stato dell\'Africa e quasi tutto il territorio è occupato dal deserto del Sahara.');
  M('EGY', 'Egitto', 'Il Cairo', 1, AF, 'Africa settentrionale (con la penisola del Sinai in Asia)', 1002000, 114000000, 'Sterlina egiziana', 'Arabo', 'Repubblica presidenziale',
    'Più del 95% degli egiziani vive lungo il Nilo e nel suo delta, su una piccola parte del territorio.');
  M('ETH', 'Etiopia', 'Addis Abeba', 1, AF, 'Africa orientale (Corno d\'Africa), senza sbocco sul mare', 1104300, 130000000, 'Birr', 'Amarico', 'Repubblica federale parlamentare',
    'Non fu mai colonia: solo occupata dall\'Italia dal 1936 al 1941. Ospita il lago Tana, da cui nasce il Nilo Azzurro.');
  M('KEN', 'Kenya', 'Nairobi', 1, AF, 'Africa orientale, sull\'Oceano Indiano', 580367, 56000000, 'Scellino keniota', 'Swahili e inglese', 'Repubblica presidenziale',
    'L\'equatore attraversa il Paese, e il Monte Kenya (5199 m) gli dà il nome.');
  M('LBY', 'Libia', 'Tripoli', 1, AF, 'Africa settentrionale, sul Mediterraneo', 1759540, 7400000, 'Dinaro libico', 'Arabo', 'Repubblica in transizione',
    'Quasi tutto il Paese è deserto e la gente vive soprattutto sulla costa. Fu colonia italiana dal 1911 al 1943.');
  M('MAR', 'Marocco', 'Rabat', 1, AF, 'Africa nord-occidentale, tra Atlantico e Mediterraneo', 446550, 37800000, 'Dirham marocchino', 'Arabo e berbero', 'Monarchia costituzionale',
    'È separato dalla Spagna solo da 14 km di mare, nello Stretto di Gibilterra.', 'Il Marocco controlla gran parte del Sahara Occidentale, territorio la cui sovranità è contesa; la superficie indicata non lo comprende.');
  M('MDG', 'Madagascar', 'Antananarivo', 1, AF, 'Grande isola dell\'Oceano Indiano, davanti al Mozambico', 587041, 31000000, 'Ariary', 'Malgascio e francese', 'Repubblica semipresidenziale',
    'È la quarta isola più grande del mondo: molti animali, come i lemuri, vivono solo lì.');
  M('NGA', 'Nigeria', 'Abuja', 1, AF, 'Africa occidentale, sul Golfo di Guinea', 923768, 230000000, 'Naira', 'Inglese', 'Repubblica federale presidenziale',
    'È lo Stato più popoloso dell\'Africa, con più di 500 lingue parlate.');
  M('COD', 'Repubblica Democratica del Congo', 'Kinshasa', 1, AF, 'Africa centrale, attraversata dal fiume Congo', 2344858, 105000000, 'Franco congolese', 'Francese', 'Repubblica semipresidenziale',
    'È il secondo Stato più grande dell\'Africa e ha la più grande foresta pluviale africana.', 'Non va confusa con la Repubblica del Congo (capitale Brazzaville), che è un altro Stato più piccolo.');
  M('ZAF', 'Sudafrica', 'Pretoria', 1, AF, 'Estremo sud dell\'Africa, tra Atlantico e Oceano Indiano', 1221037, 63000000, 'Rand', 'Undici lingue ufficiali (tra cui inglese, zulu e afrikaans)', 'Repubblica parlamentare',
    'Ha tre capitali: Pretoria (governo), Città del Capo (parlamento) e Bloemfontein (giustizia).');
  M('AGO', 'Angola', 'Luanda', 2, AF, 'Africa sud-occidentale, sull\'Atlantico', 1246700, 37000000, 'Kwanza', 'Portoghese', 'Repubblica presidenziale',
    'Ex colonia portoghese, è ricca di petrolio e diamanti.');
  M('CMR', 'Camerun', 'Yaoundé', 2, AF, 'Africa occidentale-centrale, sul Golfo di Guinea', 475440, 29000000, 'Franco CFA dell\'Africa centrale', 'Francese e inglese', 'Repubblica presidenziale',
    'Per la varietà di paesaggi, dal deserto alla foresta, è detto «l\'Africa in miniatura».');
  M('CIV', 'Costa d\'Avorio', 'Yamoussoukro', 2, AF, 'Africa occidentale, sul Golfo di Guinea', 322463, 31500000, 'Franco CFA dell\'Africa occidentale', 'Francese', 'Repubblica presidenziale',
    'È il primo produttore mondiale di cacao. La città più grande è Abidjan, ma la capitale è Yamoussoukro.');
  M('GHA', 'Ghana', 'Accra', 2, AF, 'Africa occidentale, sul Golfo di Guinea', 238533, 34000000, 'Cedi', 'Inglese', 'Repubblica presidenziale',
    'Nel 1957 fu il primo Stato dell\'Africa subsahariana a ottenere l\'indipendenza dal dominio coloniale.');
  M('MLI', 'Mali', 'Bamako', 2, AF, 'Africa occidentale, in gran parte nel Sahara, senza sbocco sul mare', 1240192, 23500000, 'Franco CFA dell\'Africa occidentale', 'Francese', 'Repubblica (governo militare di transizione)',
    'Qui sorge Timbuctù, antica città carovaniera ai margini del Sahara.');
  M('MOZ', 'Mozambico', 'Maputo', 2, AF, 'Africa sud-orientale, sull\'Oceano Indiano', 801590, 34000000, 'Metical', 'Portoghese', 'Repubblica presidenziale',
    'Ha circa 2500 km di costa sull\'Oceano Indiano.');
  M('NAM', 'Namibia', 'Windhoek', 2, AF, 'Africa sud-occidentale, sull\'Atlantico', 824292, 3000000, 'Dollaro namibiano', 'Inglese', 'Repubblica presidenziale',
    'Il deserto del Namib, uno dei più antichi del mondo, dà il nome al Paese, che ha pochissimi abitanti per km².');
  M('NER', 'Niger', 'Niamey', 2, AF, 'Africa occidentale, senza sbocco sul mare', 1267000, 27000000, 'Franco CFA dell\'Africa occidentale', 'Francese', 'Repubblica (governo militare di transizione)',
    'Prende il nome dal fiume Niger, ma gran parte del territorio è deserto.');
  M('SEN', 'Senegal', 'Dakar', 2, AF, 'Africa occidentale, sull\'Atlantico', 196712, 18000000, 'Franco CFA dell\'Africa occidentale', 'Francese', 'Repubblica presidenziale',
    'Dakar è vicina al punto più occidentale dell\'Africa continentale.');
  M('SDN', 'Sudan', 'Khartum', 2, AF, 'Africa nord-orientale, attraversata dal Nilo', 1861484, 50000000, 'Sterlina sudanese', 'Arabo e inglese', 'Repubblica (in guerra civile dal 2023)',
    'A Khartum si uniscono il Nilo Azzurro e il Nilo Bianco, e da lì scorre il Nilo.');
  M('TZA', 'Tanzania', 'Dodoma', 2, AF, 'Africa orientale, sull\'Oceano Indiano', 945087, 67000000, 'Scellino tanzaniano', 'Swahili e inglese', 'Repubblica presidenziale',
    'Qui si trovano il Kilimangiaro (5895 m, la vetta più alta dell\'Africa), il Serengeti e l\'isola di Zanzibar.');
  M('TUN', 'Tunisia', 'Tunisi', 2, AF, 'Africa settentrionale, sul Mediterraneo', 163610, 12500000, 'Dinaro tunisino', 'Arabo', 'Repubblica presidenziale',
    'Vicino alla capitale sorgeva Cartagine, la grande rivale di Roma.');
  M('TCD', 'Ciad', 'N\'Djamena', 2, AF, 'Africa centrale, senza sbocco sul mare', 1284000, 18500000, 'Franco CFA dell\'Africa centrale', 'Francese e arabo', 'Repubblica presidenziale',
    'Prende il nome dal lago Ciad, che negli ultimi decenni si è molto ridotto.');
  M('UGA', 'Uganda', 'Kampala', 2, AF, 'Africa orientale, senza sbocco sul mare', 241550, 49000000, 'Scellino ugandese', 'Inglese e swahili', 'Repubblica presidenziale',
    'Dal lago Vittoria, che bagna l\'Uganda, esce il Nilo Bianco.');
  M('ZMB', 'Zambia', 'Lusaka', 2, AF, 'Africa meridionale, senza sbocco sul mare', 752612, 21000000, 'Kwacha zambiano', 'Inglese', 'Repubblica presidenziale',
    'Condivide con lo Zimbabwe le spettacolari cascate Vittoria, sul fiume Zambesi.');
  M('ZWE', 'Zimbabwe', 'Harare', 2, AF, 'Africa meridionale, senza sbocco sul mare', 390757, 16700000, 'Dollaro zimbabwese (ZiG)', 'Inglese, shona e ndebele', 'Repubblica presidenziale',
    'Il nome significa «case di pietra», dalle rovine dell\'antica città di Great Zimbabwe.');
  M('SOM', 'Somalia', 'Mogadiscio', 2, AF, 'Africa orientale (Corno d\'Africa), sull\'Oceano Indiano', 637657, 18000000, 'Scellino somalo', 'Somalo e arabo', 'Repubblica federale',
    'Ha la costa più lunga dell\'Africa continentale. In parte fu colonia italiana.');
  M('BEN', 'Benin', 'Porto-Novo', 3, AF, 'Africa occidentale, sul Golfo di Guinea', 114763, 14000000, 'Franco CFA dell\'Africa occidentale', 'Francese', 'Repubblica presidenziale',
    'La capitale ufficiale è Porto-Novo, ma il governo ha sede a Cotonou, la città più grande.');
  M('BWA', 'Botswana', 'Gaborone', 3, AF, 'Africa meridionale, senza sbocco sul mare', 581730, 2600000, 'Pula', 'Inglese e setswana', 'Repubblica parlamentare',
    'Ha gran parte del deserto del Kalahari. La moneta si chiama «pula», che significa «pioggia».');
  M('BFA', 'Burkina Faso', 'Ouagadougou', 3, AF, 'Africa occidentale, senza sbocco sul mare', 274200, 23000000, 'Franco CFA dell\'Africa occidentale', 'Francese', 'Repubblica (governo militare di transizione)',
    'Fino al 1984 si chiamava Alto Volta; il nome attuale significa «terra degli uomini integri».');
  M('BDI', 'Burundi', 'Gitega', 3, AF, 'Africa centro-orientale, senza sbocco sul mare', 27830, 13200000, 'Franco del Burundi', 'Kirundi, francese e inglese', 'Repubblica presidenziale',
    'Dal 2019 la capitale politica è Gitega; la città più grande resta Bujumbura.');
  M('CPV', 'Capo Verde', 'Praia', 3, AF, 'Arcipelago vulcanico nell\'Atlantico, al largo del Senegal', 4033, 525000, 'Escudo capoverdiano', 'Portoghese', 'Repubblica semipresidenziale',
    'Le isole erano disabitate quando i navigatori portoghesi le raggiunsero nel XV secolo.');
  M('CAF', 'Repubblica Centrafricana', 'Bangui', 3, AF, 'Africa centrale, senza sbocco sul mare', 622984, 5400000, 'Franco CFA dell\'Africa centrale', 'Francese e sango', 'Repubblica presidenziale',
    'Si trova nel cuore dell\'Africa ed è uno dei Paesi più poveri del mondo.');
  M('COM', 'Comore', 'Moroni', 3, AF, 'Arcipelago vulcanico nel Canale di Mozambico', 1862, 850000, 'Franco comoriano', 'Comoriano, arabo e francese', 'Repubblica presidenziale federale',
    'Arcipelago tra il Madagascar e il Mozambico: la sua isola maggiore ha un vulcano attivo, il Karthala.');
  M('COG', 'Repubblica del Congo', 'Brazzaville', 3, AF, 'Africa centrale, sulla riva destra del fiume Congo', 342000, 6300000, 'Franco CFA dell\'Africa centrale', 'Francese', 'Repubblica presidenziale',
    'Brazzaville e Kinshasa, le due capitali dei Congo, sono tra le capitali più vicine del mondo: le separa solo il fiume.', 'Non va confusa con la Repubblica Democratica del Congo (capitale Kinshasa).');
  M('DJI', 'Gibuti', 'Gibuti', 3, AF, 'Africa orientale, sullo stretto di Bab el-Mandeb', 23200, 1150000, 'Franco gibutiano', 'Francese e arabo', 'Repubblica presidenziale',
    'Controlla l\'ingresso del Mar Rosso: ospita basi militari di molti Paesi.');
  M('GNQ', 'Guinea Equatoriale', 'Malabo', 3, AF, 'Africa centro-occidentale, sul Golfo di Guinea', 28050, 1800000, 'Franco CFA dell\'Africa centrale', 'Spagnolo, francese e portoghese', 'Repubblica presidenziale',
    'È l\'unico Stato africano con lo spagnolo come lingua ufficiale. La capitale Malabo è su un\'isola, Bioko.');
  M('ERI', 'Eritrea', 'Asmara', 3, AF, 'Africa orientale (Corno d\'Africa), sul Mar Rosso', 117600, 3600000, 'Nakfa', 'Tigrino, arabo e inglese', 'Repubblica presidenziale',
    'Fu colonia italiana: Asmara conserva molti edifici italiani degli anni Trenta, oggi patrimonio dell\'UNESCO.');
  M('SWZ', 'Eswatini', 'Mbabane', 3, AF, 'Africa meridionale, circondato da Sudafrica e Mozambico', 17364, 1200000, 'Lilangeni', 'Swazi e inglese', 'Monarchia assoluta',
    'Fino al 2018 si chiamava Swaziland. È una delle ultime monarchie assolute del mondo.');
  M('GAB', 'Gabon', 'Libreville', 3, AF, 'Africa centro-occidentale, sull\'Equatore', 267668, 2400000, 'Franco CFA dell\'Africa centrale', 'Francese', 'Repubblica presidenziale',
    'Oltre tre quarti del territorio sono coperti dalla foresta pluviale.');
  M('GMB', 'Gambia', 'Banjul', 3, AF, 'Africa occidentale, una striscia lungo il fiume Gambia', 11295, 2800000, 'Dalasi', 'Inglese', 'Repubblica presidenziale',
    'È il più piccolo Stato dell\'Africa continentale: è tutto circondato dal Senegal, tranne la costa.');
  M('GIN', 'Guinea', 'Conakry', 3, AF, 'Africa occidentale, sull\'Atlantico', 245857, 14200000, 'Franco guineano', 'Francese', 'Repubblica (governo militare di transizione)',
    'Qui nascono i fiumi Niger, Senegal e Gambia.');
  M('GNB', 'Guinea-Bissau', 'Bissau', 3, AF, 'Africa occidentale, sull\'Atlantico', 36125, 2200000, 'Franco CFA dell\'Africa occidentale', 'Portoghese', 'Repubblica semipresidenziale',
    'Comprende l\'arcipelago delle Bijagós, riserva della biosfera.');
  M('LSO', 'Lesotho', 'Maseru', 3, AF, 'Africa meridionale, circondato dal Sudafrica', 30355, 2300000, 'Loti', 'Sesotho e inglese', 'Monarchia costituzionale',
    'È un\'enclave nel Sudafrica e tutto il suo territorio è sopra i 1000 m di quota.');
  M('LBR', 'Liberia', 'Monrovia', 3, AF, 'Africa occidentale, sull\'Atlantico', 111369, 5400000, 'Dollaro liberiano', 'Inglese', 'Repubblica presidenziale',
    'Fu fondata nell\'Ottocento da ex schiavi statunitensi liberati. Monrovia prende il nome dal presidente americano Monroe.');
  M('MWI', 'Malawi', 'Lilongwe', 3, AF, 'Africa sud-orientale, senza sbocco sul mare', 118484, 21000000, 'Kwacha malawiano', 'Inglese e chichewa', 'Repubblica presidenziale',
    'Il lago Malawi occupa circa un quinto del territorio.');
  M('MRT', 'Mauritania', 'Nouakchott', 3, AF, 'Africa nord-occidentale, sull\'Atlantico', 1030700, 5000000, 'Ouguiya', 'Arabo', 'Repubblica presidenziale',
    'Più del 90% del territorio è occupato dal deserto del Sahara.');
  M('MUS', 'Mauritius', 'Port Louis', 3, AF, 'Isola vulcanica nell\'Oceano Indiano, a est del Madagascar', 2040, 1300000, 'Rupia mauriziana', 'Inglese e francese', 'Repubblica parlamentare',
    'Qui viveva il dodo, un grande uccello che non sapeva volare, estinto nel Seicento.');
  M('RWA', 'Ruanda', 'Kigali', 3, AF, 'Africa centro-orientale, senza sbocco sul mare', 26338, 14000000, 'Franco ruandese', 'Kinyarwanda, francese e inglese', 'Repubblica presidenziale',
    'Detto «il paese delle mille colline», è uno degli Stati africani più densamente popolati.');
  M('STP', 'São Tomé e Príncipe', 'São Tomé', 3, AF, 'Due isole vulcaniche nel Golfo di Guinea', 964, 235000, 'Dobra', 'Portoghese', 'Repubblica semipresidenziale',
    'È il secondo Stato africano più piccolo, dopo le Seychelles.');
  M('SYC', 'Seychelles', 'Victoria', 3, AF, 'Arcipelago nell\'Oceano Indiano', 457, 100000, 'Rupia delle Seychelles', 'Creolo, inglese e francese', 'Repubblica presidenziale',
    'È il più piccolo Stato dell\'Africa, formato da oltre 100 isole.');
  M('SLE', 'Sierra Leone', 'Freetown', 3, AF, 'Africa occidentale, sull\'Atlantico', 71740, 8600000, 'Leone', 'Inglese', 'Repubblica presidenziale',
    'Freetown, cioè «città libera», fu fondata per accogliere ex schiavi liberati.');
  M('SDS', 'Sudan del Sud', 'Giuba', 3, AF, 'Africa centro-orientale, senza sbocco sul mare', 619745, 11500000, 'Sterlina sudsudanese', 'Inglese', 'Repubblica presidenziale',
    'È lo Stato più giovane del mondo: nel 2011 si è staccato dal Sudan.');
  M('TGO', 'Togo', 'Lomé', 3, AF, 'Africa occidentale, sul Golfo di Guinea', 56785, 9000000, 'Franco CFA dell\'Africa occidentale', 'Francese', 'Repubblica parlamentare',
    'È lungo circa 600 km e largo, nel punto massimo, meno di 150 km.');

  // ---------- Asia ----------
  const AS = 'Asia';
  M('CHN', 'Cina', 'Pechino', 1, AS, 'Asia orientale, sul Pacifico', 9597000, 1410000000, 'Renminbi (yuan)', 'Cinese mandarino', 'Repubblica popolare a partito unico',
    'È il terzo Stato più grande del mondo e il secondo per numero di abitanti, dopo l\'India.');
  M('IND', 'India', 'Nuova Delhi', 1, AS, 'Asia meridionale, penisola indiana', 3287263, 1430000000, 'Rupia indiana', 'Hindi e inglese (e altre 20 lingue riconosciute)', 'Repubblica federale parlamentare',
    'Dal 2023 è lo Stato più popoloso del mondo.');
  M('JPN', 'Giappone', 'Tokyo', 1, AS, 'Arcipelago dell\'Asia orientale, nel Pacifico', 377975, 124000000, 'Yen', 'Giapponese', 'Monarchia costituzionale',
    'È formato da oltre 6800 isole; le quattro principali sono Honshu, Hokkaido, Kyushu e Shikoku.');
  M('IDN', 'Indonesia', 'Giacarta', 1, AS, 'Arcipelago tra Asia sud-orientale e Oceania, attraversato dall\'equatore', 1904569, 280000000, 'Rupia indonesiana', 'Indonesiano', 'Repubblica presidenziale',
    'È il più grande arcipelago del mondo, con oltre 17 000 isole.', 'Il Paese sta spostando la capitale a Nusantara, nell\'isola del Borneo.');
  M('SAU', 'Arabia Saudita', 'Riad', 1, AS, 'Penisola arabica, tra Mar Rosso e Golfo Persico', 2149690, 35000000, 'Riyal saudita', 'Arabo', 'Monarchia assoluta',
    'Qui, a La Mecca e a Medina, si trovano i luoghi più sacri dell\'islam.');
  M('IRN', 'Iran', 'Teheran', 1, AS, 'Asia occidentale, altopiano tra Mar Caspio e Golfo Persico', 1648195, 90000000, 'Rial iraniano', 'Persiano (farsi)', 'Repubblica islamica',
    'È l\'erede dell\'antica Persia, il cui impero fu uno dei più vasti dell\'antichità.');
  M('KAZ', 'Kazakistan', 'Astana', 1, AS, 'Asia centrale, senza sbocco sul mare (una piccola parte è in Europa)', 2724900, 20000000, 'Tenge', 'Kazako e russo', 'Repubblica presidenziale',
    'È il più grande Stato del mondo senza sbocco sul mare.', 'Una piccola parte del territorio, a ovest del fiume Ural, è in Europa.', true);
  M('IRQ', 'Iraq', 'Baghdad', 2, AS, 'Asia occidentale, tra i fiumi Tigri ed Eufrate', 438317, 45000000, 'Dinaro iracheno', 'Arabo e curdo', 'Repubblica parlamentare federale',
    'Era la Mesopotamia, la «terra tra i fiumi» Tigri ed Eufrate, dove nacquero le prime città.');
  M('ISR', 'Israele', 'Gerusalemme', 2, AS, 'Asia occidentale, sul Mediterraneo orientale', 22145, 9800000, 'Nuovo siclo', 'Ebraico e arabo', 'Repubblica parlamentare',
    'Il Mar Morto, che Israele condivide con la Giordania, è il punto più basso della terraferma: circa 430 m sotto il livello del mare.', 'Israele ha proclamato Gerusalemme capitale, ma lo status della città è conteso e molti Stati hanno l\'ambasciata a Tel Aviv.');
  M('PAK', 'Pakistan', 'Islamabad', 2, AS, 'Asia meridionale, lungo il fiume Indo', 881913, 240000000, 'Rupia pakistana', 'Urdu e inglese', 'Repubblica federale parlamentare',
    'Sul fiume Indo fiorì una delle più antiche civiltà del mondo, con città come Mohenjo-daro.');
  M('BGD', 'Bangladesh', 'Dacca', 2, AS, 'Asia meridionale, nel delta del Gange e del Brahmaputra', 147570, 173000000, 'Taka', 'Bengalese', 'Repubblica parlamentare',
    'Ha circa 170 milioni di abitanti su un territorio grande la metà dell\'Italia, ed è in gran parte pianeggiante e a rischio alluvioni.');
  M('THA', 'Thailandia', 'Bangkok', 2, AS, 'Asia sud-orientale, penisola indocinese', 513120, 71000000, 'Baht', 'Thai', 'Monarchia costituzionale',
    'È l\'unico Stato dell\'Asia sud-orientale che non è mai stato colonia europea.');
  M('VNM', 'Vietnam', 'Hanoi', 2, AS, 'Asia sud-orientale, sul Mar Cinese Meridionale', 331212, 100000000, 'Dong', 'Vietnamita', 'Repubblica socialista a partito unico',
    'È stretto e lungo, con la forma di una S, per circa 1600 km lungo il mare.');
  M('PHL', 'Filippine', 'Manila', 2, AS, 'Arcipelago dell\'Asia sud-orientale, nel Pacifico', 300000, 115000000, 'Peso filippino', 'Filippino e inglese', 'Repubblica presidenziale',
    'Sono formate da oltre 7600 isole, quasi tutte molto piccole.');
  M('MYS', 'Malaysia', 'Kuala Lumpur', 2, AS, 'Asia sud-orientale: penisola malese e nord del Borneo', 330803, 34000000, 'Ringgit', 'Malese', 'Monarchia federale',
    'È divisa in due parti separate dal Mar Cinese Meridionale: la penisola malese e il nord dell\'isola del Borneo.');
  M('MNG', 'Mongolia', 'Ulan Bator', 2, AS, 'Asia centro-orientale, senza sbocco sul mare', 1564116, 3400000, 'Tugrik', 'Mongolo', 'Repubblica semipresidenziale',
    'Ha una delle densità di popolazione più basse del mondo: circa 2 abitanti per km².');
  M('KOR', 'Corea del Sud', 'Seul', 2, AS, 'Penisola coreana, nell\'Asia orientale', 100210, 51700000, 'Won sudcoreano', 'Coreano', 'Repubblica presidenziale',
    'Ha una grande industria elettronica e automobilistica; l\'area di Seul è tra le più popolose al mondo.');
  M('PRK', 'Corea del Nord', 'Pyongyang', 2, AS, 'Penisola coreana, nell\'Asia orientale', 120538, 26000000, 'Won nordcoreano', 'Coreano', 'Repubblica socialista a partito unico',
    'Dal 1953 è separata dalla Corea del Sud da una fascia di territorio vicina al 38° parallelo, la «zona demilitarizzata».');
  M('AFG', 'Afghanistan', 'Kabul', 2, AS, 'Asia centro-meridionale, senza sbocco sul mare', 652864, 43000000, 'Afghani', 'Pashtu e dari', 'Emirato islamico',
    'È un Paese montuoso, attraversato dalla catena dell\'Hindu Kush.');
  M('UZB', 'Uzbekistan', 'Tashkent', 2, AS, 'Asia centrale, senza sbocco sul mare', 448978, 36000000, 'Som uzbeko', 'Uzbeko', 'Repubblica presidenziale',
    'È, con il Liechtenstein, uno dei due Stati al mondo «doppiamente senza sbocco sul mare»: anche tutti i suoi vicini non hanno sbocco sul mare.');
  M('ARE', 'Emirati Arabi Uniti', 'Abu Dhabi', 2, AS, 'Penisola arabica, sul Golfo Persico', 83600, 10000000, 'Dirham degli Emirati', 'Arabo', 'Federazione di monarchie',
    'È formato da sette emirati. Il grattacielo più alto del mondo, il Burj Khalifa, è a Dubai.');
  M('SYR', 'Siria', 'Damasco', 3, AS, 'Asia occidentale, sul Mediterraneo orientale', 185180, 24000000, 'Lira siriana', 'Arabo', 'Repubblica (governo di transizione)',
    'Damasco è una delle città abitate da più tempo senza interruzione.');
  M('JOR', 'Giordania', 'Amman', 3, AS, 'Asia occidentale, tra Israele e Arabia Saudita', 89342, 11500000, 'Dinaro giordano', 'Arabo', 'Monarchia costituzionale',
    'Qui si trova Petra, città scavata nella roccia e una delle «nuove sette meraviglie del mondo».');
  M('LBN', 'Libano', 'Beirut', 3, AS, 'Asia occidentale, sul Mediterraneo orientale', 10452, 5400000, 'Lira libanese', 'Arabo', 'Repubblica parlamentare',
    'Sulla bandiera c\'è un cedro, albero simbolo del Paese.');
  M('ARM', 'Armenia', 'Erevan', 3, AS, 'Caucaso meridionale, senza sbocco sul mare', 29743, 3000000, 'Dram', 'Armeno', 'Repubblica parlamentare',
    'Nel 301 fu il primo Stato al mondo ad adottare il cristianesimo come religione ufficiale.', 'Il Caucaso è considerato il confine tra Europa e Asia: gli Stati caucasici sono a cavallo tra i due continenti.', true);
  M('AZE', 'Azerbaigian', 'Baku', 3, AS, 'Caucaso, affacciato sul Mar Caspio', 86600, 10100000, 'Manat azero', 'Azero', 'Repubblica presidenziale',
    'Ha petrolio sulle coste del Mar Caspio, già sfruttato da più di un secolo.', 'Il Caucaso è considerato il confine tra Europa e Asia: gli Stati caucasici sono a cavallo tra i due continenti.', true);
  M('GEO', 'Georgia', 'Tbilisi', 3, AS, 'Caucaso, sul Mar Nero', 69700, 3700000, 'Lari', 'Georgiano', 'Repubblica parlamentare',
    'È uno dei luoghi dove è nata la coltivazione della vite: si produce vino da circa 8000 anni.', 'Il Caucaso è considerato il confine tra Europa e Asia: gli Stati caucasici sono a cavallo tra i due continenti.', true);
  M('BHR', 'Bahrein', 'Manama', 3, AS, 'Arcipelago nel Golfo Persico', 786, 1500000, 'Dinaro del Bahrein', 'Arabo', 'Monarchia costituzionale',
    'Arcipelago di una trentina di isole nel Golfo Persico, tra i più piccoli Stati dell\'Asia.');
  M('BTN', 'Bhutan', 'Thimphu', 3, AS, 'Asia meridionale, sull\'Himalaya, tra Cina e India', 38394, 790000, 'Ngultrum', 'Dzongkha', 'Monarchia costituzionale',
    'Misura la «felicità interna lorda» e non solo la ricchezza economica.');
  M('BRN', 'Brunei', 'Bandar Seri Begawan', 3, AS, 'Costa settentrionale dell\'isola del Borneo', 5765, 450000, 'Dollaro del Brunei', 'Malese', 'Monarchia assoluta (sultanato)',
    'Piccolo sultanato sul Borneo, molto ricco grazie al petrolio e al gas naturale.');
  M('KHM', 'Cambogia', 'Phnom Penh', 3, AS, 'Asia sud-orientale, penisola indocinese', 181035, 17000000, 'Riel', 'Khmer', 'Monarchia costituzionale',
    'Qui si trova Angkor Wat, il più grande complesso religioso del mondo.');
  M('KWT', 'Kuwait', 'Kuwait City', 3, AS, 'Penisola arabica, sul Golfo Persico', 17818, 4900000, 'Dinaro kuwaitiano', 'Arabo', 'Emirato (monarchia costituzionale)',
    'Il dinaro kuwaitiano è una delle monete di maggior valore al mondo.');
  M('KGZ', 'Kirghizistan', 'Biškek', 3, AS, 'Asia centrale, senza sbocco sul mare', 199951, 7000000, 'Som', 'Kirghiso e russo', 'Repubblica presidenziale',
    'Più del 90% del territorio è montuoso, tra le catene del Tien Shan.');
  M('LAO', 'Laos', 'Vientiane', 3, AS, 'Asia sud-orientale, senza sbocco sul mare', 236800, 7700000, 'Kip', 'Lao', 'Repubblica socialista a partito unico',
    'È l\'unico Stato dell\'Asia sud-orientale senza sbocco sul mare.');
  M('MDV', 'Maldive', 'Malé', 3, AS, 'Atolli dell\'Oceano Indiano, a sud-ovest dell\'India', 298, 520000, 'Rufiyaa', 'Dhivehi', 'Repubblica presidenziale',
    'È lo Stato più basso del mondo: l\'altitudine media è di circa 1,5 m sul livello del mare.');
  M('MMR', 'Birmania (Myanmar)', 'Naypyidaw', 3, AS, 'Asia sud-orientale, sul Golfo del Bengala', 676578, 54000000, 'Kyat', 'Birmano', 'Repubblica (governo militare)',
    'Dal 2005 la capitale è Naypyidaw, costruita al posto di Yangon (Rangoon).');
  M('NPL', 'Nepal', 'Katmandu', 3, AS, 'Asia meridionale, sull\'Himalaya, tra Cina e India', 147516, 30000000, 'Rupia nepalese', 'Nepalese', 'Repubblica federale parlamentare',
    'Sul confine con la Cina c\'è l\'Everest, la vetta più alta del mondo (8849 m).');
  M('OMN', 'Oman', 'Mascate', 3, AS, 'Penisola arabica, sul Mar Arabico', 309500, 5200000, 'Rial omanita', 'Arabo', 'Sultanato (monarchia assoluta)',
    'Una parte del suo territorio, la penisola di Musandam, affaccia sullo stretto di Hormuz.');
  M('QAT', 'Qatar', 'Doha', 3, AS, 'Penisola nel Golfo Persico', 11586, 2700000, 'Riyal qatariano', 'Arabo', 'Emirato (monarchia assoluta)',
    'Nel 2022 ha ospitato i Mondiali di calcio.');
  M('SGP', 'Singapore', 'Singapore', 3, AS, 'Isola all\'estremità della penisola malese', 735, 6000000, 'Dollaro di Singapore', 'Inglese, mandarino, malese e tamil', 'Repubblica parlamentare',
    'È una città-Stato su un\'isola e ha uno dei porti più trafficati del mondo.');
  M('LKA', 'Sri Lanka', 'Sri Jayawardenepura Kotte', 3, AS, 'Isola nell\'Oceano Indiano, a sud dell\'India', 65610, 22000000, 'Rupia dello Sri Lanka', 'Singalese e tamil', 'Repubblica presidenziale',
    'Si chiamava Ceylon ed è famoso per il tè. La città più grande e porto principale è Colombo.');
  M('TJK', 'Tagikistan', 'Dušanbe', 3, AS, 'Asia centrale, senza sbocco sul mare', 143100, 10000000, 'Somoni', 'Tagico', 'Repubblica presidenziale',
    'Circa il 90% del territorio è montuoso, con le cime del Pamir.');
  M('TLS', 'Timor Est', 'Dili', 3, AS, 'Metà orientale dell\'isola di Timor', 14874, 1400000, 'Dollaro statunitense', 'Tetum e portoghese', 'Repubblica semipresidenziale',
    'È indipendente dal 2002: è uno degli Stati più giovani del mondo.');
  M('TKM', 'Turkmenistan', 'Ashgabat', 3, AS, 'Asia centrale, affacciato sul Mar Caspio', 488100, 7000000, 'Manat turkmeno', 'Turkmeno', 'Repubblica presidenziale',
    'Circa il 70% del territorio è coperto dal deserto del Karakum.');
  M('YEM', 'Yemen', 'Sana\'a', 3, AS, 'Penisola arabica, tra Mar Rosso e Mar Arabico', 527968, 35000000, 'Rial yemenita', 'Arabo', 'Repubblica (in guerra civile)',
    'Gli antichi Romani lo chiamavano «Arabia Felice» perché era ricco e fertile.');
  M('PSX', 'Palestina', 'Ramallah', 3, AS, 'Asia occidentale: Cisgiordania e Striscia di Gaza', 6020, 5400000, 'Nuovo siclo israeliano', 'Arabo', 'Autorità Nazionale Palestinese',
    'È formata da due territori separati: la Cisgiordania e la Striscia di Gaza.', 'La Palestina è riconosciuta come Stato da oltre 140 Paesi, ma non da tutti. Ha proclamato Gerusalemme Est capitale; il governo ha sede a Ramallah.');
  M('TWN', 'Taiwan', 'Taipei', 3, AS, 'Isola nell\'Asia orientale, davanti alla Cina', 36193, 23400000, 'Nuovo dollaro taiwanese', 'Cinese mandarino', 'Repubblica semipresidenziale',
    'È un\'isola con un governo autonomo e una grande industria di microchip.', 'La Cina la considera una propria provincia, e pochi Stati la riconoscono ufficialmente.');

  // ---------- America settentrionale e centrale ----------
  const AN = 'America settentrionale', AC = 'America centrale';
  M('CAN', 'Canada', 'Ottawa', 1, AN, 'America settentrionale, tra Atlantico, Pacifico e Artico', 9984670, 40000000, 'Dollaro canadese', 'Inglese e francese', 'Monarchia costituzionale federale',
    'È il secondo Stato più grande del mondo e ha la costa più lunga del pianeta.');
  M('USA', 'Stati Uniti d\'America', 'Washington', 1, AN, 'America settentrionale (con l\'Alaska e le isole Hawaii)', 9833517, 335000000, 'Dollaro statunitense', 'Inglese', 'Repubblica federale presidenziale',
    'È formato da 50 Stati: l\'Alaska e le Hawaii sono staccati dal resto del Paese.');
  M('MEX', 'Messico', 'Città del Messico', 1, AC, 'Tra America del Nord e istmo centroamericano, tra Pacifico e Golfo del Messico', 1964375, 129000000, 'Peso messicano', 'Spagnolo', 'Repubblica federale presidenziale',
    'Città del Messico sorge dove c\'era Tenochtitlán, la capitale degli Aztechi.', 'Geograficamente il Messico fa parte del Nordamerica; nei libri di scuola italiani è spesso incluso nell\'America centrale.', true);
  M('CUB', 'Cuba', 'L\'Avana', 1, AC, 'La più grande isola dei Caraibi', 109884, 11000000, 'Peso cubano', 'Spagnolo', 'Repubblica socialista a partito unico',
    'È la più grande isola dei Caraibi, a circa 150 km dalla Florida.');
  M('GTM', 'Guatemala', 'Città del Guatemala', 2, AC, 'America centrale, tra Pacifico e Mar dei Caraibi', 108889, 18000000, 'Quetzal', 'Spagnolo', 'Repubblica presidenziale',
    'Fu il cuore dell\'antica civiltà maya: nel nord c\'è la città di Tikal.');
  M('PAN', 'Panama', 'Panama', 2, AC, 'America centrale, istmo tra America del Nord e del Sud', 75417, 4500000, 'Balboa e dollaro statunitense', 'Spagnolo', 'Repubblica presidenziale',
    'Il Canale di Panama, lungo circa 80 km, collega l\'oceano Atlantico e il Pacifico.');
  M('BLZ', 'Belize', 'Belmopan', 3, AC, 'America centrale, sul Mar dei Caraibi', 22966, 410000, 'Dollaro del Belize', 'Inglese', 'Monarchia costituzionale',
    'È l\'unico Stato dell\'America centrale con l\'inglese come lingua ufficiale.');
  M('HND', 'Honduras', 'Tegucigalpa', 3, AC, 'America centrale, tra Pacifico e Mar dei Caraibi', 112492, 10500000, 'Lempira', 'Spagnolo', 'Repubblica presidenziale',
    'Nel suo territorio c\'è Copán, una grande città dell\'antica civiltà maya.');
  M('SLV', 'El Salvador', 'San Salvador', 3, AC, 'America centrale, sul Pacifico', 21041, 6300000, 'Dollaro statunitense', 'Spagnolo', 'Repubblica presidenziale',
    'È il più piccolo Stato dell\'America centrale continentale e ha moltissimi vulcani.');
  M('NIC', 'Nicaragua', 'Managua', 3, AC, 'America centrale, tra Pacifico e Mar dei Caraibi', 130373, 6900000, 'Córdoba', 'Spagnolo', 'Repubblica presidenziale',
    'Ospita il lago Nicaragua, il più grande dell\'America centrale.');
  M('CRI', 'Costa Rica', 'San José', 3, AC, 'America centrale, tra Pacifico e Mar dei Caraibi', 51100, 5200000, 'Colón costaricano', 'Spagnolo', 'Repubblica presidenziale',
    'Nel 1948 ha abolito l\'esercito e protegge circa un quarto del territorio come parco naturale.');
  M('HTI', 'Haiti', 'Port-au-Prince', 3, AC, 'Parte occidentale dell\'isola di Hispaniola (Caraibi)', 27750, 11700000, 'Gourde', 'Creolo haitiano e francese', 'Repubblica (in crisi istituzionale)',
    'Nel 1804 fu il primo Stato fondato da ex schiavi che si erano liberati.');
  M('DOM', 'Repubblica Dominicana', 'Santo Domingo', 3, AC, 'Parte orientale dell\'isola di Hispaniola (Caraibi)', 48671, 11300000, 'Peso dominicano', 'Spagnolo', 'Repubblica presidenziale',
    'Divide l\'isola di Hispaniola con Haiti.', 'Non va confusa con Dominica, un piccolo Stato insulare dei Caraibi.');
  M('JAM', 'Giamaica', 'Kingston', 3, AC, 'Isola dei Caraibi, a sud di Cuba', 10991, 2800000, 'Dollaro giamaicano', 'Inglese', 'Monarchia costituzionale',
    'È la patria del reggae e del cantante Bob Marley.');
  M('BHS', 'Bahamas', 'Nassau', 3, AC, 'Arcipelago dell\'Atlantico, a est della Florida', 13940, 410000, 'Dollaro delle Bahamas', 'Inglese', 'Monarchia costituzionale',
    'È un arcipelago di circa 700 isole, di cui poche abitate.');
  M('BRB', 'Barbados', 'Bridgetown', 3, AC, 'Isola più orientale dei Caraibi', 439, 282000, 'Dollaro delle Barbados', 'Inglese', 'Repubblica parlamentare',
    'Dal 2021 è una repubblica: prima il suo capo dello Stato era il re del Regno Unito.');
  M('ATG', 'Antigua e Barbuda', 'Saint John\'s', 3, AC, 'Isole dei Caraibi orientali (Piccole Antille)', 442, 94000, 'Dollaro dei Caraibi orientali', 'Inglese', 'Monarchia costituzionale',
    'È formato da due isole principali: Antigua e Barbuda.');
  M('KNA', 'Saint Kitts e Nevis', 'Basseterre', 3, AC, 'Isole dei Caraibi orientali (Piccole Antille)', 261, 48000, 'Dollaro dei Caraibi orientali', 'Inglese', 'Monarchia costituzionale',
    'È lo Stato più piccolo delle Americhe sia per superficie sia per numero di abitanti.');
  M('LCA', 'Santa Lucia', 'Castries', 3, AC, 'Isola dei Caraibi orientali (Piccole Antille)', 539, 180000, 'Dollaro dei Caraibi orientali', 'Inglese', 'Monarchia costituzionale',
    'È famosa per i Pitons, due picchi vulcanici che si alzano direttamente dal mare.');
  M('VCT', 'Saint Vincent e Grenadine', 'Kingstown', 3, AC, 'Isole dei Caraibi orientali (Piccole Antille)', 389, 110000, 'Dollaro dei Caraibi orientali', 'Inglese', 'Monarchia costituzionale',
    'Comprende un\'isola principale e le piccole isole Grenadine.');
  M('GRD', 'Grenada', 'Saint George\'s', 3, AC, 'Isola dei Caraibi orientali (Piccole Antille)', 344, 126000, 'Dollaro dei Caraibi orientali', 'Inglese', 'Monarchia costituzionale',
    'È chiamata «l\'isola delle spezie» perché produce molta noce moscata.');
  M('DMA', 'Dominica', 'Roseau', 3, AC, 'Isola dei Caraibi orientali (Piccole Antille)', 751, 73000, 'Dollaro dei Caraibi orientali', 'Inglese', 'Repubblica parlamentare',
    'È un\'isola vulcanica ricoperta da foreste, detta «l\'isola della natura».', 'Non va confusa con la Repubblica Dominicana, che è molto più grande.');
  M('TTO', 'Trinidad e Tobago', 'Port of Spain', 3, AC, 'Due isole davanti alla costa del Venezuela', 5130, 1500000, 'Dollaro di Trinidad e Tobago', 'Inglese', 'Repubblica parlamentare',
    'Trinidad è molto vicina al Venezuela: è l\'isola più meridionale dei Caraibi.');

  // ---------- America meridionale ----------
  const AM = 'America meridionale';
  M('BRA', 'Brasile', 'Brasilia', 1, AM, 'America meridionale, sull\'Atlantico', 8515767, 213000000, 'Real', 'Portoghese', 'Repubblica federale presidenziale',
    'Ospita gran parte della foresta amazzonica ed è l\'unico grande Stato sudamericano di lingua portoghese.');
  M('ARG', 'Argentina', 'Buenos Aires', 1, AM, 'America meridionale, tra Ande e Atlantico', 2780400, 46000000, 'Peso argentino', 'Spagnolo', 'Repubblica federale presidenziale',
    'Qui si trovano l\'Aconcagua (6961 m), la vetta più alta delle Americhe, e quasi tutta la Patagonia.');
  M('CHL', 'Cile', 'Santiago', 1, AM, 'America meridionale, striscia tra Ande e Pacifico', 756102, 19800000, 'Peso cileno', 'Spagnolo', 'Repubblica presidenziale',
    'È lungo circa 4300 km, ma largo in media solo 180 km.');
  M('PER', 'Perù', 'Lima', 1, AM, 'America meridionale, sul Pacifico', 1285216, 34000000, 'Sol', 'Spagnolo, quechua e aymara', 'Repubblica presidenziale',
    'Qui si trova Machu Picchu, la città inca sulle Ande.');
  M('COL', 'Colombia', 'Bogotà', 1, AM, 'America meridionale, tra Pacifico e Mar dei Caraibi', 1141748, 52000000, 'Peso colombiano', 'Spagnolo', 'Repubblica presidenziale',
    'È l\'unico Stato sudamericano con coste sia sul Pacifico sia sul Mar dei Caraibi.');
  M('VEN', 'Venezuela', 'Caracas', 1, AM, 'America meridionale, sul Mar dei Caraibi', 912050, 28000000, 'Bolívar', 'Spagnolo', 'Repubblica presidenziale',
    'Ha il Salto Angel, la cascata più alta del mondo (979 m).');
  M('BOL', 'Bolivia', 'Sucre', 1, AM, 'America meridionale, sulle Ande, senza sbocco sul mare', 1098581, 12000000, 'Boliviano', 'Spagnolo e molte lingue indigene', 'Repubblica presidenziale',
    'Ha due capitali: Sucre (capitale costituzionale) e La Paz (sede del governo).', 'La sede del governo è La Paz, la capitale più alta del mondo.');
  M('ECU', 'Ecuador', 'Quito', 2, AM, 'America meridionale, sul Pacifico, attraversato dall\'equatore', 256370, 18000000, 'Dollaro statunitense', 'Spagnolo', 'Repubblica presidenziale',
    'Il nome significa «equatore». Gli appartengono le isole Galápagos, dove studiò Darwin.');
  M('URY', 'Uruguay', 'Montevideo', 2, AM, 'America meridionale, sull\'Atlantico', 176215, 3400000, 'Peso uruguaiano', 'Spagnolo', 'Repubblica presidenziale',
    'È il secondo Stato più piccolo del Sud America, dopo il Suriname.');
  M('PRY', 'Paraguay', 'Asunción', 2, AM, 'America meridionale, senza sbocco sul mare', 406752, 6900000, 'Guaraní', 'Spagnolo e guaraní', 'Repubblica presidenziale',
    'Insieme alla Bolivia è l\'altro Stato sudamericano senza sbocco sul mare.');
  M('GUY', 'Guyana', 'Georgetown', 3, AM, 'America meridionale, sull\'Atlantico', 214969, 810000, 'Dollaro della Guyana', 'Inglese', 'Repubblica parlamentare',
    'È l\'unico Stato sudamericano con l\'inglese come lingua ufficiale.');
  M('SUR', 'Suriname', 'Paramaribo', 3, AM, 'America meridionale, sull\'Atlantico', 163820, 620000, 'Dollaro surinamese', 'Olandese', 'Repubblica presidenziale',
    'È il più piccolo Stato del Sud America, e l\'unico in cui si parla olandese.');

  // ---------- Oceania ----------
  const OC = 'Oceania';
  M('AUS', 'Australia', 'Canberra', 1, OC, 'Continente-isola nell\'emisfero australe, tra Indiano e Pacifico', 7692024, 27000000, 'Dollaro australiano', 'Inglese', 'Monarchia costituzionale federale',
    'È al tempo stesso uno Stato e un continente; qui vivono animali come canguri e koala.');
  M('NZL', 'Nuova Zelanda', 'Wellington', 1, OC, 'Due isole principali nel Pacifico sud-occidentale', 268021, 5200000, 'Dollaro neozelandese', 'Inglese e maori', 'Monarchia costituzionale',
    'Ha più pecore che abitanti.');
  M('PNG', 'Papua Nuova Guinea', 'Port Moresby', 2, OC, 'Metà orientale dell\'isola della Nuova Guinea e isole vicine', 462840, 10300000, 'Kina', 'Inglese, tok pisin e hiri motu', 'Monarchia costituzionale',
    'Si parlano oltre 800 lingue: è il Paese più multilingue del mondo.');
  M('FJI', 'Figi', 'Suva', 3, OC, 'Arcipelago del Pacifico meridionale', 18274, 930000, 'Dollaro delle Figi', 'Inglese, figiano e hindi', 'Repubblica parlamentare',
    'Ha più di 330 isole, ma solo un terzo circa è abitato.');
  M('SLB', 'Isole Salomone', 'Honiara', 3, OC, 'Arcipelago del Pacifico, a est della Papua Nuova Guinea', 28896, 740000, 'Dollaro delle Salomone', 'Inglese', 'Monarchia costituzionale',
    'Honiara si trova sull\'isola di Guadalcanal, dove si combatté una grande battaglia della Seconda guerra mondiale.');
  M('VUT', 'Vanuatu', 'Port Vila', 3, OC, 'Arcipelago vulcanico del Pacifico meridionale', 12189, 330000, 'Vatu', 'Bislama, inglese e francese', 'Repubblica parlamentare',
    'È un arcipelago di origine vulcanica, con vulcani ancora attivi.');
  M('WSM', 'Samoa', 'Apia', 3, OC, 'Isole del Pacifico meridionale', 2842, 220000, 'Tala', 'Samoano e inglese', 'Repubblica parlamentare',
    'Nel 2011 ha spostato la linea del cambiamento di data: il 30 dicembre di quell\'anno non è esistito.');
  M('TON', 'Tonga', 'Nuku\'alofa', 3, OC, 'Arcipelago del Pacifico meridionale', 747, 105000, 'Paʻanga', 'Tongano e inglese', 'Monarchia costituzionale',
    'È un regno formato da circa 170 isole, di cui una trentina abitate.');
  M('KIR', 'Kiribati', 'Tarawa Sud', 3, OC, 'Atolli sparsi nel Pacifico centrale, attraversati dall\'equatore', 811, 135000, 'Dollaro australiano', 'Inglese e gilbertese', 'Repubblica presidenziale',
    'È l\'unico Stato che si trova in tutti e quattro gli emisferi della Terra, perché è attraversato sia dall\'equatore sia dal meridiano di 180°.');
  M('TUV', 'Tuvalu', 'Funafuti', 3, OC, 'Atolli del Pacifico meridionale', 26, 11000, 'Dollaro australiano', 'Tuvaluano e inglese', 'Monarchia costituzionale',
    'Con soli 26 km², è tra i quattro Stati più piccoli del mondo: il mare che sale è per lui una minaccia.');
  M('NRU', 'Nauru', 'Yaren', 3, OC, 'Isola del Pacifico, vicino all\'equatore', 21, 12500, 'Dollaro australiano', 'Nauruano e inglese', 'Repubblica parlamentare',
    'È il terzo Stato più piccolo del mondo, dopo il Vaticano e il Principato di Monaco.', 'Non ha una capitale ufficiale: Yaren è la sede del governo.');
  M('PLW', 'Palau', 'Ngerulmud', 3, OC, 'Isole del Pacifico occidentale (Micronesia)', 459, 18000, 'Dollaro statunitense', 'Palauano e inglese', 'Repubblica presidenziale',
    'Le isole Rock di Palau sono note per la barriera corallina, patrimonio dell\'UNESCO.');
  M('MHL', 'Isole Marshall', 'Majuro', 3, OC, 'Atolli del Pacifico centrale (Micronesia)', 181, 42000, 'Dollaro statunitense', 'Marshallese e inglese', 'Repubblica presidenziale',
    'Negli atolli di Bikini ed Enewetak, tra gli anni Quaranta e Cinquanta, furono fatti molti test nucleari.');
  M('FSM', 'Micronesia', 'Palikir', 3, OC, 'Isole del Pacifico occidentale (Micronesia)', 702, 115000, 'Dollaro statunitense', 'Inglese', 'Repubblica federale',
    'È formato da quattro Stati federati: Chuuk, Kosrae, Pohnpei e Yap.');

  // continenti, nell'ordine in cui compaiono nelle risposte
  window.PAESI_MONDO = P;
  window.CONTINENTI = ['Europa', 'Asia', 'Africa', 'America settentrionale', 'America centrale', 'America meridionale', 'Oceania'];
})();
