// Contenuti didattici della geografia fisica: livelli, domande "Stati collegati" e curiosità.
// Questo file si modifica a mano. Per ogni elemento:
//   C(id, livello, 'Stati giusti', 'Stati tollerati (non penalizzati)', 'domanda personalizzata o null', 'curiosità o null')
// Livello 1 = facile (gli elementi della verifica), 2 = medio, 3 = difficile.
// Gli Stati si indicano con il codice a tre lettere (ITA, FRA, DEU...).
(function () {
  const X = {};
  const C = (id, liv, ok, tol, q, chicca) => {
    X[id] = { liv, s: ok ? ok.split(' ') : [], t: tol ? tol.split(' ') : [], q: q || null, chicca: chicca || null };
  };

  // ===== LIVELLO 1: gli elementi della verifica =====
  // Catene montuose
  C('monte_pirenei', 1, 'FRA ESP', 'AND', 'Quali Stati separano i Pirenei?');
  C('monte_alpi', 1, 'FRA ITA CHE AUT DEU', 'SVN LIE', 'Quali Stati attraversano le Alpi?');
  C('monte_carpazi', 1, 'SVK POL UKR ROU', 'CZE HUN SRB', 'Quali Stati attraversano i Carpazi?');
  C('monte_caucaso', 1, 'RUS', '', 'In quale Stato (tra quelli della mappa) si trova il Caucaso?');
  C('monte_urali', 1, 'RUS', '', 'In quale Stato (tra quelli della mappa) si trovano gli Urali?');
  // Pianure
  C('pian_padana', 1, 'ITA', '', 'In quale Stato si trova la Pianura padana?');
  C('pian_germanico', 1, 'DEU POL NLD', 'DNK BEL', 'Quali Stati attraversa il Bassopiano germanico?');
  C('pian_francese', 1, 'FRA', '', 'In quale Stato si trova il Bassopiano francese?');
  C('pian_valacchia', 1, 'ROU', '', 'In quale Stato si trova la Valacchia?');
  C('pian_sarmatico', 1, 'RUS UKR BLR', 'POL LTU LVA EST MDA', 'Quali Stati attraversa il Bassopiano sarmatico?');
  // Mari
  C('mare_atlantico', 1, 'PRT ESP FRA IRL GBR ISL', 'NOR', 'Quali Stati bagna l\'Oceano Atlantico?');
  C('mare_mediterraneo', 1, 'ESP FRA ITA SVN HRV MNE ALB GRC TUR CYP', 'BIH MLT', 'Quali Stati bagna il Mar Mediterraneo?');
  C('mare_nero', 1, 'BGR ROU UKR RUS TUR', '', 'Quali Stati bagna il Mar Nero?');
  C('mare_nord', 1, 'GBR NOR DNK DEU NLD BEL FRA', '', 'Quali Stati bagna il Mare del Nord?');
  C('mare_baltico', 1, 'SWE FIN RUS EST LVA LTU POL DEU DNK', '', 'Quali Stati bagna il Mar Baltico?');
  // Fiumi
  C('fiume_po', 1, 'ITA', '', 'In quale Stato scorre il Po?');
  C('fiume_reno', 1, 'FRA DEU CHE', 'AUT LIE NLD', 'Quali Stati divide il Reno?');
  C('fiume_danubio', 1, 'DEU AUT SVK HUN HRV SRB ROU BGR MDA UKR', '', 'Quali Stati attraversa o divide il Danubio?');
  C('fiume_dnepr', 1, 'UKR', 'BLR RUS', 'In quale Stato scorre il Dnepr?');
  C('fiume_volga', 1, 'RUS', '', 'In quale Stato scorre il Volga?');

  // ===== LIVELLO 2: tutte le catene montuose e gli elementi principali =====
  // (per la Spagna: solo Cordigliera Cantabrica, Cordigliera Centrale e Sierra Morena)
  C('monte_appennini', 2, 'ITA');
  C('monte_scandinavi', 2, 'NOR SWE', 'FIN');
  C('monte_dinariche', 2, 'SVN HRV BIH MNE ALB SRB');
  C('monte_balcani', 2, 'BGR SRB');
  C('monte_rodopi', 2, 'BGR GRC');
  C('monte_massiccio', 2, 'FRA');
  C('monte_giura', 2, 'CHE FRA');
  C('monte_vosgi', 2, 'FRA');
  C('monte_foresta', 2, 'DEU');
  C('monte_sudeti', 2, 'CZE POL');
  C('monte_metalliferi', 2, 'DEU CZE');
  C('monte_ardenne', 2, 'BEL LUX FRA');
  C('monte_pennini', 2, 'GBR');
  C('monte_highlands', 2, 'GBR');
  C('monte_cantabrica', 2, 'ESP');
  C('monte_centrale', 2, 'ESP PRT');
  C('monte_morena', 2, 'ESP');
  C('pian_pannonica', 2, 'HUN SRB HRV ROU', 'SVK AUT SVN');
  C('pian_meseta', 2, 'ESP', 'PRT');
  C('mare_adriatico', 2, 'ITA SVN HRV MNE ALB', 'BIH');
  C('mare_tirreno', 2, 'ITA FRA');
  C('mare_ionio', 2, 'ITA GRC ALB');
  C('mare_egeo', 2, 'GRC TUR');
  C('mare_manica', 2, 'GBR FRA');
  C('mare_biscaglia', 2, 'FRA ESP');
  C('mare_norvegia', 2, 'NOR', 'ISL');
  C('mare_barents', 2, 'NOR RUS');
  C('mare_botnia', 2, 'SWE FIN');
  C('mare_caspio', 2, 'RUS');
  C('mare_irlanda', 2, 'IRL GBR');
  C('fiume_senna', 2, 'FRA');
  C('fiume_tamigi', 2, 'GBR');
  C('fiume_elba', 2, 'CZE DEU');
  C('fiume_loira', 2, 'FRA');
  C('fiume_garonna', 2, 'FRA', 'ESP');
  C('fiume_tago', 2, 'ESP PRT');
  C('fiume_ebro', 2, 'ESP');
  C('fiume_rodano', 2, 'CHE FRA');
  C('fiume_vistola', 2, 'POL');
  C('fiume_oder', 2, 'CZE POL DEU');
  C('fiume_don', 2, 'RUS');
  C('fiume_tevere', 2, 'ITA');
  C('fiume_adige', 2, 'ITA');
  C('fiume_arno', 2, 'ITA');
  C('pen_iberica', 2, 'ESP PRT', 'AND');
  C('pen_italiana', 2, 'ITA', 'SMR VAT');
  C('pen_balcanica', 2, 'GRC ALB MKD BGR MNE BIH SRB', 'HRV ROU TUR SVN');
  C('pen_scandinava', 2, 'NOR SWE', 'FIN');
  C('pen_giutlandia', 2, 'DNK DEU');
  C('isola_gbr', 2, 'GBR');
  C('isola_irlanda', 2, 'IRL GBR');
  C('isola_islanda', 2, 'ISL');
  C('isola_sicilia', 2, 'ITA');
  C('isola_sardegna', 2, 'ITA');
  C('isola_corsica', 2, 'FRA');
  C('isola_creta', 2, 'GRC');
  C('isola_cipro', 2, 'CYP');
  C('vetta_bianco', 2, 'FRA ITA', 'CHE');
  C('vetta_etna', 2, 'ITA');
  C('vetta_vesuvio', 2, 'ITA');
  C('vetta_elbrus', 2, 'RUS');
  C('lago_garda', 2, 'ITA');
  C('lago_como', 2, 'ITA');
  C('lago_lemano', 2, 'CHE FRA');
  C('lago_ladoga', 2, 'RUS');

  // ===== LIVELLO 3: ogni elemento ha anche una curiosità =====
  C('monte_sierranevada', 3, 'ESP', '', null, 'Ospita una stazione sciistica tra le più meridionali d\'Europa, a poca distanza dal mare.');
  C('monte_iberico', 3, 'ESP', '', null, 'Da qui nascono diversi fiumi iberici, tra cui il Tago.');
  C('monte_tatra', 3, 'SVK POL', '', null, 'Sono la parte più alta dei Carpazi e segnano il confine tra Polonia e Slovacchia.');
  C('monte_dolomiti', 3, 'ITA', '', null, 'Sono patrimonio UNESCO dal 2009 e hanno ospitato i Giochi olimpici invernali di Milano-Cortina 2026.');
  C('vetta_hekla', 3, 'ISL', '', null, 'Nel Medioevo era chiamata «la porta dell\'inferno» per le sue eruzioni.');
  C('vetta_olimpo', 3, 'GRC', '', null, 'Nella mitologia greca era la dimora degli dèi.');
  C('vetta_stromboli', 3, 'ITA', '', null, 'È detto «il faro del Mediterraneo» perché erutta quasi di continuo.');
  C('vetta_mulhacen', 3, 'ESP', '', null, 'Il nome deriva da Muley Hacén, un emiro di Granada.');
  C('pen_crimea', 3, 'UKR', '', null, 'È stata annessa dalla Russia nel 2014, ma l\'annessione non è riconosciuta dalla comunità internazionale: per l\'ONU è territorio ucraino.');
  C('pen_peloponneso', 3, 'GRC', '', null, 'È separato dalla Grecia continentale dal canale di Corinto, scavato tra il 1881 e il 1893.');
  C('pen_kola', 3, 'RUS', '', null, 'Nel porto di Severomorsk ha sede la Flotta del Nord russa.');
  C('mare_finlandia', 3, 'FIN EST RUS', '', 'Quali Stati bagna il Golfo di Finlandia?', 'Dall\'ingresso della Finlandia nella NATO (2023), tutte le coste del golfo, tranne quelle russe, appartengono a Paesi NATO.');
  C('mare_bianco', 3, 'RUS', '', null, 'Il canale Mar Bianco–Baltico, costruito negli anni Trenta, lo collega al Mar Baltico.');
  C('mare_gibilterra', 3, 'ESP', '', 'Quale Stato europeo si affaccia sullo Stretto di Gibilterra?', 'È largo appena 14 km nel punto più stretto. Gibilterra è un territorio britannico d\'oltremare rivendicato dalla Spagna.');
  C('mare_baleari', 3, 'ESP', '', null, 'Il nome deriva dai frombolieri «baleari», abili nell\'antichità a lanciare pietre con la fionda.');
  C('mare_leone', 3, 'FRA ESP', '', null, 'Qui soffiano venti freddi e forti come il Mistral, che scende lungo la valle del Rodano.');
  C('fiume_duero', 3, 'ESP PRT', '', null, 'Sfocia a Porto, e le sue valli producono il vino che porta il nome della città.');
  C('fiume_neva', 3, 'RUS', '', null, 'È lungo solo 74 km, ma attraversa San Pietroburgo, fondata da Pietro il Grande nel 1703.');
  C('fiume_dnestr', 3, 'UKR MDA', '', null, 'In Moldavia segna il confine con la Transnistria, la regione separatista non riconosciuta.');
  C('fiume_tibisco', 3, 'UKR ROU HUN SRB', 'SVK', null, 'Nel 2000 uno sversamento di cianuro in Romania ne inquinò le acque fino all\'Ungheria.');
  C('fiume_dvina', 3, 'RUS', '', null, 'Si getta nel Mar Bianco vicino ad Arcangelo, importante porto russo.');
  C('fiume_pechora', 3, 'RUS', '', null, 'Scorre in una regione ricca di petrolio e gas, nel nord della Russia.');
  C('fiume_daugava', 3, 'RUS BLR LVA', '', null, 'Sfocia nel Golfo di Riga, a Riga, la capitale della Lettonia.');
  C('fiume_oka', 3, 'RUS', '', null, 'Si getta nel Volga a Nižnij Novgorod, una delle più grandi città russe.');
  C('fiume_sava', 3, 'SVN HRV BIH SRB', '', null, 'Bagna tre capitali: Lubiana, Zagabria e Belgrado, dove si getta nel Danubio.');
  C('fiume_piave', 3, 'ITA', '', null, 'È chiamato «fiume sacro alla Patria»: nel 1917-18 l\'esercito italiano fermò qui l\'avanzata austro-ungarica.');
  C('fiume_shannon', 3, 'IRL', '', null, 'È il fiume più lungo di tutte le isole britanniche e irlandesi (circa 360 km).');
  C('lago_costanza', 3, 'DEU AUT CHE', '', null, 'I confini tra i tre Stati nel lago non sono mai stati definiti ufficialmente.');
  C('lago_balaton', 3, 'HUN', '', null, 'Viene chiamato «il mare ungherese», perché l\'Ungheria non ha sbocchi sul mare.');
  C('lago_onega', 3, 'RUS', '', null, 'È il secondo lago d\'Europa per estensione, dopo il Ladoga.');
  C('lago_vanern', 3, 'SWE', '', null, 'È il più grande lago dell\'Unione europea.');
  C('lago_saimaa', 3, 'FIN', '', null, 'La Finlandia è detta «il Paese dei mille laghi», ma in realtà ne ha circa 188.000.');
  C('lago_vattern', 3, 'SWE', '', null, 'Fa parte del canale Göta, che attraversa la Svezia dal Baltico al Kattegat.');
  C('lago_peipus', 3, 'EST RUS', '', null, 'Segna il confine tra Estonia (NATO e UE) e Russia.');
  C('lago_scutari', 3, 'MNE ALB', '', null, 'È il più grande lago dei Balcani ed è diviso tra Montenegro e Albania.');
  C('lago_bracciano', 3, 'ITA', '', null, 'È di origine vulcanica e rifornisce d\'acqua una parte di Roma.');
  C('isola_baleari', 3, 'ESP', '', null, 'Maiorca, Minorca, Ibiza e Formentera: il turismo è la loro principale risorsa.');
  C('isola_malta', 3, 'MLT', '', null, 'È uno Stato dell\'UE; come nel Regno Unito, qui si guida a sinistra.');
  C('isola_gotland', 3, 'SWE', '', null, 'È strategica nel Baltico: dopo il 2018 la Svezia vi ha rafforzato la presenza militare.');
  C('isola_zelanda', 3, 'DNK', '', null, 'Qui sorge Copenaghen; il ponte dell\'Øresund la collega alla Svezia.');
  C('isola_rodi', 3, 'GRC', '', null, 'Nell\'antichità ospitava il Colosso, una delle sette meraviglie del mondo; oggi è vicinissima alla costa turca.');
  C('isola_eubea', 3, 'GRC', '', null, 'È la seconda isola greca per estensione, dopo Creta, ed è unita alla terraferma da un ponte.');
  C('isola_lesbo', 3, 'GRC', '', null, 'Dal 2015 è uno dei principali punti d\'arrivo dei migranti dalla Turchia.');
  C('isola_elba', 3, 'ITA', '', null, 'Napoleone vi fu esiliato nel 1814-15.');
  C('isola_orcadi', 3, 'GBR', '', null, 'Fanno parte della Scozia, che nel 2014 votò un referendum sull\'indipendenza dal Regno Unito.');

  window.CONTENUTI = X;
})();
