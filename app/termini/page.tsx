import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export const metadata = {
  title: 'Termini e Condizioni — LapCoach',
  description: 'Termini e condizioni di utilizzo di LapCoach: app, device e accesso beta.',
}

// ─── Componenti di supporto ────────────────────────────────────────────────

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10">
      <h2 className="font-display font-black text-white uppercase text-xl mb-4 flex items-center gap-3">
        <span className="text-amber">§</span> {title}
      </h2>
      <div className="space-y-3 text-data/80 text-sm leading-relaxed pl-5 border-l border-pit-600">
        {children}
      </div>
    </section>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}

function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-amber/20 text-amber px-1 rounded-sm font-medium not-italic">
      {children}
    </mark>
  )
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="list-none space-y-1.5 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-amber mt-0.5 shrink-0">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

// ─── Indice laterale ───────────────────────────────────────────────────────

const sections = [
  { id: 'titolare',      label: '1. Titolare' },
  { id: 'oggetto',       label: '2. Oggetto' },
  { id: 'app',           label: "3. L'App" },
  { id: 'beta',          label: '4. Accesso beta' },
  { id: 'device',        label: '5. Il Device' },
  { id: 'responsabilita',label: '6. Responsabilità' },
  { id: 'sicurezza',     label: '7. Uso in pista' },
  { id: 'ip',            label: '8. Proprietà intellettuale' },
  { id: 'recesso',       label: '9. Diritto di recesso' },
  { id: 'garanzia',      label: '10. Garanzia legale' },
  { id: 'modifiche',     label: '11. Modifiche' },
  { id: 'legge',         label: '12. Legge e foro' },
]

// ─── Pagina ────────────────────────────────────────────────────────────────

export default function TerminiPage() {
  return (
    <>
      <Navbar />
      <main className="bg-pit-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-5 pt-32 pb-20">

          {/* Header */}
          <div className="mb-12">
            <p className="section-label mb-3">Legale</p>
            <h1
              className="font-display font-black uppercase text-white leading-none mb-3"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
            >
              Termini e Condizioni
            </h1>
            <p className="text-data/60 text-xs font-display uppercase tracking-wider">
              Ultimo aggiornamento: marzo 2026
            </p>

            {/* Nota placeholder */}
            <div className="mt-5 bg-amber/10 border border-amber/30 px-4 py-3 text-xs text-amber leading-relaxed max-w-2xl">
              <strong>Nota interna:</strong> i campi evidenziati in arancione sono placeholder da completare
              con i dati societari definitivi prima del lancio pubblico.
            </div>
          </div>

          <div className="grid lg:grid-cols-[220px_1fr] gap-12 items-start">

            {/* Indice sticky */}
            <nav className="hidden lg:block sticky top-24 border border-pit-600 bg-pit-800 p-5">
              <p className="section-label mb-4">Indice</p>
              <ul className="space-y-2">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-xs text-data/70 hover:text-white transition-colors font-display uppercase tracking-wide"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contenuto */}
            <div className="max-w-2xl">

              <Section id="titolare" title="Titolare del servizio">
                <P>
                  Il servizio LapCoach è gestito da{' '}
                  EBSM SRL,
                  con sede legale in Corso Buenos Aires 20, 20124 Milano (MI),
                  P.IVA 09104640967,
                  iscritta al Registro delle Imprese di Milano                  
                </P>
                <P>
                  Contatto:{' '}
                  <a href="mailto:support@lapcoach.racing" className="text-lap hover:underline">
                    support@lapcoach.racing
                  </a>
                </P>
              </Section>

              <Section id="oggetto" title="Oggetto">
                <P>
                  I presenti Termini e Condizioni («Termini») regolano l&apos;accesso e l&apos;utilizzo
                  di LapCoach nelle sue componenti:
                </P>
                <Ul items={[
                  "l'applicazione mobile LapCoach per iOS e Android («App»), disponibile gratuitamente;",
                  "il programma di accesso beta al device LapCoach One («Beta»);",
                  "il sito web lapcoach.racing e i servizi connessi.",
                ]} />
                <P>
                  L&apos;utilizzo di uno qualsiasi dei servizi LapCoach implica l&apos;accettazione
                  integrale dei presenti Termini. Se non si accettano, è necessario cessare
                  immediatamente l&apos;utilizzo.
                </P>
              </Section>

              <Section id="app" title="L'App — licenza d'uso">
                <P>
                  LapCoach concede all&apos;utente una licenza personale, non esclusiva,
                  non trasferibile e revocabile per utilizzare l&apos;App sui dispositivi
                  di propria proprietà, nel rispetto dei presenti Termini.
                </P>
                <P>
                  <strong className="text-white">Gratuità:</strong> l&apos;App è distribuita
                  gratuitamente. Non sono previsti abbonamenti né acquisti in-app al momento
                  del lancio. LapCoach si riserva di introdurre funzionalità premium opzionali
                  in futuro, previo avviso agli utenti.
                </P>
                <P>
                  <strong className="text-white">Dati e telemetria:</strong> i dati GPS,
                  i tempi sul giro e la telemetria acquisiti dall&apos;App vengono salvati
                  esclusivamente sul dispositivo dell&apos;utente. LapCoach non trasmette
                  né memorizza su propri server dati di posizione o telemetria personali.
                </P>
                <P>
                  <strong className="text-white">Aggiornamenti:</strong> LapCoach può
                  rilasciare aggiornamenti dell&apos;App che modificano funzionalità esistenti
                  o ne aggiungono di nuove. Gli aggiornamenti critici di sicurezza sono
                  fortemente consigliati.
                </P>
                <P>
                  È vietato: decompilare, fare reverse engineering, modificare, ridistribuire
                  o sublicenziare l&apos;App o qualsiasi sua parte.
                </P>
              </Section>

              <Section id="beta" title="Accesso beta">
                <P>
                  Il programma Beta è riservato a un numero limitato di utenti selezionati
                  da LapCoach in base al profilo di utilizzo dichiarato nel modulo di
                  candidatura. La candidatura non garantisce l&apos;accesso.
                </P>
                <P>
                  <strong className="text-white">Selezione:</strong> LapCoach si riserva
                  il diritto insindacabile di selezionare, escludere o rimuovere i beta
                  tester in qualsiasi momento, senza obbligo di motivazione.
                </P>
                <P>
                  <strong className="text-white">Feedback:</strong> i beta tester si
                  impegnano a fornire feedback strutturato sull&apos;utilizzo del prodotto
                  secondo le modalità indicate da LapCoach. Il feedback fornito non dà
                  diritto ad alcun compenso e può essere utilizzato da LapCoach per
                  migliorare il prodotto.
                </P>
                <P>
                  <strong className="text-white">Riservatezza:</strong> i beta tester si
                  impegnano a non divulgare pubblicamente (inclusi social media, forum,
                  recensioni) caratteristiche, difetti o comportamenti del prodotto beta
                  senza preventivo consenso scritto di LapCoach.
                </P>
                <P>
                  <strong className="text-white">Natura del prodotto:</strong> il device
                  fornito nell&apos;ambito del Beta è un prototipo pre-produzione.
                  Le caratteristiche tecniche, il software e le funzionalità possono
                  differire significativamente dal prodotto finale.
                </P>
              </Section>

              <Section id="device" title="Il Device">
                <P>
                  Il device LapCoach One è attualmente disponibile esclusivamente nell&apos;ambito
                  del programma Beta. Le condizioni di vendita al pubblico saranno definite
                  al momento del lancio commerciale.
                </P>
                <P>
                  <strong className="text-white">Specifiche tecniche:</strong> le specifiche
                  indicate sul sito (modulo GPS u-blox M10, frequenza 20Hz, connettività
                  Bluetooth Low Energy) si riferiscono al prodotto in sviluppo e potrebbero
                  subire variazioni prima del lancio definitivo.
                </P>
                <P>
                  <strong className="text-white">Uso previsto:</strong> il device è progettato
                  per l&apos;utilizzo in contesti di track day e attività motorsport su circuiti
                  chiusi al traffico. Non è certificato per uso su strada né per applicazioni
                  di sicurezza attiva.
                </P>
              </Section>

              <Section id="responsabilita" title="Limitazione di responsabilità">
                <P>
                  Nei limiti consentiti dalla legge applicabile, LapCoach non sarà responsabile
                  per danni indiretti, incidentali, consequenziali o punitivi derivanti
                  dall&apos;utilizzo o dall&apos;impossibilità di utilizzo del servizio,
                  inclusi a titolo esemplificativo: perdita di dati, interruzione dell&apos;attività,
                  perdita di profitto.
                </P>
                <P>
                  LapCoach non garantisce che l&apos;App o il device siano privi di errori,
                  che il servizio sia ininterrotto, o che i dati GPS siano accurati in ogni
                  condizione ambientale. L&apos;accuratezza del GPS dipende da fattori esterni
                  (copertura satellitare, ostacoli fisici, interferenze) non controllabili
                  da LapCoach.
                </P>
                <P>
                  Nei casi in cui la responsabilità non possa essere esclusa per legge,
                  la responsabilità complessiva di LapCoach è limitata all&apos;importo
                  pagato dall&apos;utente per il servizio negli ultimi 12 mesi.
                </P>
              </Section>

              <Section id="sicurezza" title="Uso in pista — avvertenze di sicurezza">
                <P>
                  <strong className="text-white">
                    LapCoach è uno strumento di analisi della prestazione, non un sistema
                    di sicurezza attiva.
                  </strong>{' '}
                  Non deve in nessun caso essere consultato durante la guida in pista.
                </P>
                <P>
                  L&apos;utente è il solo responsabile della propria sicurezza e di quella
                  di terzi durante l&apos;utilizzo del veicolo in pista. LapCoach non si
                  assume alcuna responsabilità per incidenti, danni a persone o cose,
                  conseguenti o connessi all&apos;utilizzo dell&apos;App o del device.
                </P>
                <Ul items={[
                  'Non consultare mai l\'App o i dati in tempo reale mentre si guida.',
                  'Rispettare sempre il regolamento del circuito e le indicazioni dei marshal.',
                  'Fissare il device in modo sicuro prima di entrare in pista.',
                  'Il device non è omologato come equipaggiamento di sicurezza.',
                ]} />
                <P>
                  I suggerimenti dell&apos;AI Coach sono analisi automatizzate a scopo
                  orientativo. Non sostituiscono la valutazione di un istruttore qualificato
                  né devono essere applicati senza adeguata verifica.
                </P>
              </Section>

              <Section id="ip" title="Proprietà intellettuale">
                <P>
                  Il marchio LapCoach, il logo, il design dell&apos;App, il software,
                  i testi e qualsiasi altro contenuto sono di proprietà esclusiva di{' '}
                  EBSM SRL{' '}
                  o dei rispettivi titolari, e sono protetti dalle leggi italiane ed europee
                  in materia di diritto d&apos;autore e proprietà intellettuale.
                </P>
                <P>
                  È vietata qualsiasi riproduzione, distribuzione, modifica o utilizzo
                  commerciale dei contenuti senza autorizzazione scritta di LapCoach.
                </P>
              </Section>

              <Section id="recesso" title="Diritto di recesso">
                <P>
                  Ai sensi degli artt. 52–58 del D.Lgs. 206/2005 (Codice del Consumo),
                  i consumatori hanno diritto di recedere dal contratto di acquisto del
                  device entro <strong className="text-white">14 giorni</strong> dalla
                  ricezione del prodotto, senza necessità di fornire motivazioni.
                </P>
                <P>
                  Per esercitare il diritto di recesso, l&apos;utente deve inviare una
                  dichiarazione esplicita a{' '}
                  <a href="mailto:support@lapcoach.racing" className="text-lap hover:underline">
                    support@lapcoach.racing
                  </a>{' '}
                  prima della scadenza del termine. Il prodotto dovrà essere restituito
                  in condizioni integre, nell&apos;imballaggio originale, entro 14 giorni
                  dalla comunicazione del recesso.
                </P>
                <P>
                  LapCoach rimborserà il prezzo pagato entro 14 giorni dalla ricezione
                  del prodotto reso, utilizzando lo stesso metodo di pagamento usato
                  per l&apos;acquisto.
                </P>
                <P>
                  <strong className="text-white">App:</strong> poiché l&apos;App è gratuita,
                  il diritto di recesso non trova applicazione pratica in relazione ad essa.
                </P>
              </Section>

              <Section id="garanzia" title="Garanzia legale">
                <P>
                  Il device LapCoach è coperto dalla garanzia legale di conformità prevista
                  dagli artt. 128–135 del D.Lgs. 206/2005 per una durata di{' '}
                  <strong className="text-white">24 mesi</strong> dalla data di consegna,
                  applicabile ai consumatori.
                </P>
                <P>
                  In caso di difetto di conformità, l&apos;utente ha diritto, a sua scelta,
                  alla riparazione o alla sostituzione del prodotto, o — qualora tali rimedi
                  non siano possibili o comportino costi sproporzionati — alla riduzione
                  del prezzo o alla risoluzione del contratto.
                </P>
                <P>
                  La garanzia non copre danni causati da uso improprio, cadute, urti,
                  liquidi, modifiche non autorizzate o usura normale.
                </P>
                <P>
                  LapCoach offre inoltre una garanzia commerciale aggiuntiva di{' '}
                  <strong className="text-white">12 mesi</strong> che estende la copertura
                  a guasti non derivanti da uso improprio, con sostituzione o riparazione
                  senza costi aggiuntivi per l&apos;utente.
                </P>
              </Section>

              <Section id="modifiche" title="Modifiche ai Termini">
                <P>
                  LapCoach si riserva il diritto di modificare i presenti Termini in
                  qualsiasi momento. Le modifiche sostanziali saranno comunicate con
                  almeno 15 giorni di preavviso via email o tramite avviso nell&apos;App.
                </P>
                <P>
                  L&apos;utilizzo continuato del servizio dopo la data di entrata in vigore
                  delle modifiche costituisce accettazione dei nuovi Termini.
                </P>
              </Section>

              <Section id="legge" title="Legge applicabile e foro competente">
                <P>
                  I presenti Termini sono regolati dalla legge italiana. Per qualsiasi
                  controversia relativa all&apos;interpretazione, esecuzione o risoluzione
                  dei presenti Termini, è competente il Tribunale di{' '}
                  Milano.
                </P>
                <P>
                  Per i consumatori, resta ferma la competenza del tribunale del luogo
                  di residenza o domicilio del consumatore, ai sensi dell&apos;art. 66-bis
                  del D.Lgs. 206/2005.
                </P>
                <P>
                  Per la risoluzione alternativa delle controversie (ADR/ODR), il consumatore
                  può accedere alla piattaforma europea ODR disponibile all&apos;indirizzo{' '}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lap hover:underline"
                  >
                    ec.europa.eu/consumers/odr
                  </a>.
                </P>
              </Section>

              {/* Footer nota */}
              <div className="border-t border-pit-600 pt-8 mt-8">
                <p className="text-data/50 text-xs leading-relaxed">
                  Per domande sui presenti Termini:{' '}
                  <a href="mailto:support@lapcoach.racing" className="text-lap hover:underline">
                    support@lapcoach.racing
                  </a>
                </p>
              </div>

              <div className="mt-8">
                <Link href="/" className="btn-outline text-sm inline-flex items-center gap-2">
                  ← Torna alla home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
