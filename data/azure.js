BANK.azure={name:'Technologie chmurowe – Azure',icon:'☁️',color:'#0369a1',
intro:'BTI jest współorganizowane przez firmy, więc pytania są „certyfikacyjne” (AZ-900 / AZ-104): modele usług, hierarchia zasobów, kluczowe usługi i ich zastosowania.',
lessons:[
{h:'IaaS, PaaS, SaaS – kto za co odpowiada',html:`
<figure class="diagram"><svg viewBox="0 0 700 290" width="700" role="img" aria-label="Model współdzielonej odpowiedzialności">
<g font-size="13" text-anchor="middle">
<text x="130" y="18" font-weight="800">On-premises</text><text x="270" y="18" font-weight="800">IaaS</text><text x="410" y="18" font-weight="800">PaaS</text><text x="550" y="18" font-weight="800">SaaS</text>
<g id="rows"></g></g>
<g font-size="12" font-weight="600" text-anchor="middle">
<!-- 7 warstw x 4 kolumny; niebieski = Ty, szary = dostawca -->
<g fill="#0369a1"><rect x="65" y="28" width="130" height="30" rx="5"/><rect x="65" y="62" width="130" height="30" rx="5"/><rect x="65" y="96" width="130" height="30" rx="5"/><rect x="65" y="130" width="130" height="30" rx="5"/><rect x="65" y="164" width="130" height="30" rx="5"/><rect x="65" y="198" width="130" height="30" rx="5"/><rect x="65" y="232" width="130" height="30" rx="5"/>
<rect x="205" y="28" width="130" height="30" rx="5"/><rect x="205" y="62" width="130" height="30" rx="5"/><rect x="205" y="96" width="130" height="30" rx="5"/><rect x="205" y="130" width="130" height="30" rx="5"/>
<rect x="345" y="28" width="130" height="30" rx="5"/><rect x="345" y="62" width="130" height="30" rx="5"/><rect x="485" y="62" width="130" height="30" rx="5"/></g>
<g fill="#9a958a"><rect x="205" y="164" width="130" height="30" rx="5"/><rect x="205" y="198" width="130" height="30" rx="5"/><rect x="205" y="232" width="130" height="30" rx="5"/>
<rect x="345" y="96" width="130" height="30" rx="5"/><rect x="345" y="130" width="130" height="30" rx="5"/><rect x="345" y="164" width="130" height="30" rx="5"/><rect x="345" y="198" width="130" height="30" rx="5"/><rect x="345" y="232" width="130" height="30" rx="5"/>
<rect x="485" y="28" width="130" height="30" rx="5"/><rect x="485" y="96" width="130" height="30" rx="5"/><rect x="485" y="130" width="130" height="30" rx="5"/><rect x="485" y="164" width="130" height="30" rx="5"/><rect x="485" y="198" width="130" height="30" rx="5"/><rect x="485" y="232" width="130" height="30" rx="5"/></g>
<g class="w"><text x="130" y="48">Aplikacje</text><text x="130" y="82">Dane</text><text x="130" y="116">Środowisko (runtime)</text><text x="130" y="150">System operacyjny</text><text x="130" y="184">Wirtualizacja</text><text x="130" y="218">Serwery</text><text x="130" y="252">Sieć i storage</text>
<text x="270" y="48">Aplikacje</text><text x="270" y="82">Dane</text><text x="270" y="116">Środowisko</text><text x="270" y="150">System operacyjny</text><text x="270" y="184">Wirtualizacja</text><text x="270" y="218">Serwery</text><text x="270" y="252">Sieć i storage</text>
<text x="410" y="48">Aplikacje</text><text x="410" y="82">Dane</text><text x="410" y="116">Środowisko</text><text x="410" y="150">System operacyjny</text><text x="410" y="184">Wirtualizacja</text><text x="410" y="218">Serwery</text><text x="410" y="252">Sieć i storage</text>
<text x="550" y="48">Aplikacje</text><text x="550" y="82">Dane</text><text x="550" y="116">Środowisko</text><text x="550" y="150">System operacyjny</text><text x="550" y="184">Wirtualizacja</text><text x="550" y="218">Serwery</text><text x="550" y="252">Sieć i storage</text></g></g>
<rect x="640" y="30" width="14" height="14" fill="#0369a1" rx="3"/><text x="660" y="42" font-size="12" text-anchor="start">Ty</text>
<rect x="640" y="52" width="14" height="14" fill="#9a958a" rx="3"/><text x="660" y="64" font-size="12" text-anchor="start">Dostawca</text></svg><figcaption>Im wyżej w „PaaS/SaaS”, tym więcej zarządza Microsoft. Zawsze odpowiadasz za dane, tożsamości i konfigurację dostępu.</figcaption></figure>
<table><tr><th>Model</th><th>Przykład w Azure</th></tr>
<tr><td><b>IaaS</b></td><td>Azure Virtual Machines, Virtual Network, Managed Disks</td></tr>
<tr><td><b>PaaS</b></td><td>App Service, Azure SQL Database, Azure Functions, Cosmos DB</td></tr>
<tr><td><b>SaaS</b></td><td>Microsoft 365, Dynamics 365</td></tr></table>
<div class="callout tip">Dane, konta użytkowników i uprawnienia to <b>zawsze</b> odpowiedzialność klienta, w każdym modelu.</div>`},
{h:'Hierarchia zasobów i podstawy',html:`
<figure class="diagram"><svg viewBox="0 0 620 240" width="620" role="img" aria-label="Hierarchia Azure">
<g font-size="13" text-anchor="middle" font-weight="700">
<rect class="bx" x="230" y="6" width="160" height="38" rx="9"/><text x="310" y="30">Grupa zarządzania</text>
<rect class="bx" x="230" y="66" width="160" height="38" rx="9"/><text x="310" y="90">Subskrypcja</text>
<rect class="bx" x="90" y="126" width="170" height="38" rx="9"/><text x="175" y="150">Grupa zasobów A</text>
<rect class="bx" x="360" y="126" width="170" height="38" rx="9"/><text x="445" y="150">Grupa zasobów B</text>
<rect class="bx" x="30" y="190" width="100" height="38" rx="9"/><text x="80" y="214">VM</text><rect class="bx" x="140" y="190" width="100" height="38" rx="9"/><text x="190" y="214">Storage</text>
<rect class="bx" x="300" y="190" width="100" height="38" rx="9"/><text x="350" y="214">SQL DB</text><rect class="bx" x="410" y="190" width="100" height="38" rx="9"/><text x="460" y="214">App Svc</text></g>
<path class="ln" d="M310 44V66M310 104V115M175 115H445M175 115V126M445 115V126M175 164V176M80 176H190M80 176V190M190 176V190M445 164V176M350 176H460M350 176V190M460 176V190"/></svg></figure>
<ul>
<li>Każdy zasób należy do <b>dokładnie jednej</b> grupy zasobów. Usunięcie grupy usuwa wszystkie jej zasoby.</li>
<li>Grupa zasobów należy do <b>jednej</b> subskrypcji. Subskrypcja = granica rozliczeń i uprawnień.</li>
<li><b>Region</b> – obszar geograficzny z datacentrami. <b>Availability Zone</b> – fizycznie osobne datacentrum <i>w obrębie</i> regionu (osobne zasilanie, chłodzenie, sieć). Zone-redundant = przetrwa awarię jednego datacentrum.</li>
<li><b>Microsoft Entra ID</b> (dawniej Azure Active Directory) – tożsamości, SSO, MFA, Conditional Access. <b>Azure RBAC</b>: role Owner, Contributor, Reader nadawane na zakresie (management group / subskrypcja / grupa zasobów / zasób).</li>
<li><b>Azure Policy</b> – wymusza zasady (np. „tylko te regiony”). <b>Resource Locks</b> – chronią przed przypadkowym usunięciem.</li>
</ul>
<div class="callout tip">Historia: Microsoft zaprezentował platformę jako <b>Windows Azure w październiku 2008</b> (konferencja PDC), ogólna dostępność komercyjna to <b>luty 2010</b>, nazwa „Microsoft Azure” od 2014.</div>`},
{h:'Mapa usług, które trzeba znać',html:`
<table><tr><th>Obszar</th><th>Usługi</th><th>Do czego</th></tr>
<tr><td><b>Obliczenia</b></td><td>Virtual Machines, App Service, <b>Functions</b>, Container Apps, AKS (Kubernetes)</td><td>Hostowanie aplikacji: od pełnej kontroli (VM) do bezserwerowości (Functions)</td></tr>
<tr><td><b>Storage</b></td><td>Blob, Files, Queue, Table, Disk</td><td>Pliki, udziały SMB, kolejki wiadomości</td></tr>
<tr><td><b>Bazy</b></td><td>Azure SQL Database, Cosmos DB, PostgreSQL/MySQL Flexible Server, Redis Cache</td><td>Relacyjne i NoSQL jako usługa</td></tr>
<tr><td><b>Sieć</b></td><td>Virtual Network, NSG, Load Balancer (L4), Application Gateway (L7 + WAF), Front Door (globalny L7), Traffic Manager (DNS), VPN Gateway, ExpressRoute</td><td>Łączność, filtrowanie ruchu, rozkładanie obciążenia</td></tr>
<tr><td><b>Bezpieczeństwo</b></td><td>Key Vault, Defender for Cloud, Entra ID</td><td>Sekrety, klucze, certyfikaty, wykrywanie zagrożeń</td></tr>
<tr><td><b>Monitoring</b></td><td>Azure Monitor, Log Analytics, Application Insights</td><td>Metryki, logi, alerty, APM</td></tr>
<tr><td><b>Automatyzacja</b></td><td>ARM templates, <b>Bicep</b>, Terraform, Azure DevOps, GitHub Actions</td><td>Infrastructure as Code i CI/CD</td></tr>
<tr><td><b>AI</b></td><td>Azure OpenAI / Azure AI Foundry, AI Search, AI Services</td><td>Modele językowe, wyszukiwanie, rozpoznawanie obrazu/mowy</td></tr></table>
<h4>Blob Storage – warstwy dostępu</h4>
<figure class="diagram"><svg viewBox="0 0 640 130" width="640" role="img" aria-label="Warstwy Blob">
<g font-size="13" text-anchor="middle" font-weight="700">
<rect x="10" y="20" width="145" height="70" rx="10" fill="#dc2626" opacity=".85"/><text x="82" y="52" fill="#fff" style="fill:#fff">Hot</text><text x="82" y="72" font-size="11" style="fill:#fff" font-weight="500">często używane</text>
<rect x="170" y="20" width="145" height="70" rx="10" fill="#ea580c" opacity=".85"/><text x="242" y="52" style="fill:#fff">Cool</text><text x="242" y="72" font-size="11" style="fill:#fff" font-weight="500">≥ 30 dni</text>
<rect x="330" y="20" width="145" height="70" rx="10" fill="#0284c7" opacity=".85"/><text x="402" y="52" style="fill:#fff">Cold</text><text x="402" y="72" font-size="11" style="fill:#fff" font-weight="500">≥ 90 dni</text>
<rect x="490" y="20" width="140" height="70" rx="10" fill="#1e3a8a" opacity=".9"/><text x="560" y="52" style="fill:#fff">Archive</text><text x="560" y="72" font-size="11" style="fill:#fff" font-weight="500">≥ 180 dni, offline</text></g>
<text x="320" y="112" text-anchor="middle" font-size="12" class="t2">← droższy storage, tańszy dostęp | tańszy storage, droższy dostęp →</text></svg></figure>
<p>Archive wymaga <b>rehydratacji</b> (nawet do kilkunastu godzin) przed odczytem.</p>`},
{h:'Funkcje bezserwerowe, koszty, IaC',html:`
<h4>Azure Functions</h4>
<ul><li><b>Event-driven</b>: uruchamiane przez wyzwalacz (trigger): HTTP, Timer, Blob, Queue, Event Hub, Service Bus.</li>
<li><b>Serverless</b>: nie zarządzasz serwerami; plan Consumption płaci się za wykonania i czas.</li>
<li>Bindings upraszczają odczyt/zapis do innych usług bez kodu „kleju”.</li></ul>
<h4>Modele cenowe</h4>
<table><tr><th>Model</th><th>Opis</th></tr>
<tr><td>Pay-as-you-go</td><td>Płacisz za faktyczne zużycie, bez zobowiązań</td></tr>
<tr><td>Reserved Instances / Savings Plan</td><td>Zobowiązanie na 1 lub 3 lata = duży rabat</td></tr>
<tr><td>Spot VM</td><td>Bardzo tanie, ale Azure może je <b>wyłączyć</b>, gdy potrzebuje mocy</td></tr>
<tr><td>Azure Hybrid Benefit</td><td>Użycie posiadanych licencji Windows Server/SQL w chmurze</td></tr></table>
<h4>Infrastructure as Code</h4>
<p>Opis infrastruktury w plikach (powtarzalność, kontrola wersji). <b>Bicep</b> – deklaratywny język Microsoftu kompilowany do ARM; <b>ARM template</b> – JSON; <b>Terraform</b> – multi-cloud. Klikanie w portalu to nie IaC.</p>
<pre>resource stg 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: 'bti2026storage'
  location: 'westeurope'
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
}</pre>
<h4>Cosmos DB</h4>
<p>Globalnie rozproszona, wielomodelowa baza NoSQL z 5 poziomami spójności (Strong, Bounded staleness, Session, Consistent prefix, Eventual) i wieloma API (NoSQL, MongoDB, Cassandra, Gremlin, Table).</p>`}
],
qs:[
{p:1,q:'Które stwierdzenia o <b>hierarchii zasobów Azure</b> są prawdziwe?',o:[['Każdy zasób należy do dokładnie jednej grupy zasobów',1,'Zasób nie może jednocześnie siedzieć w dwóch grupach.'],['Usunięcie grupy zasobów usuwa wszystkie zasoby, które w niej są',1,'Dlatego grupa jest wygodnym „kontenerem cyklu życia”.'],['Subskrypcja może zawierać wiele grup zasobów',1,'Hierarchia: grupa zarządzania → subskrypcja → grupa zasobów → zasób.'],['Jedna grupa zasobów może obejmować wiele subskrypcji',0,'Grupa zasobów jest zawsze w obrębie jednej subskrypcji.']],tip:'Hierarchia ma kształt drzewa – dziecko ma jednego rodzica.'},
{p:3,q:'Które z poniższych usług Azure to <b>PaaS</b>?',o:[['Azure App Service',1,'Hostujesz kod, a platformą (OS, patchowanie, skalowanie) zarządza Microsoft.'],['Azure SQL Database',1,'Zarządzana baza: backupy i patchowanie po stronie dostawcy.'],['Azure Virtual Machine',0,'To IaaS – sam odpowiadasz za system operacyjny.'],['Microsoft 365',0,'To SaaS – gotowa aplikacja.']],tip:'IaaS = wirtualna maszyna i sieć; PaaS = platforma na kod; SaaS = gotowa aplikacja.'},
{p:1,q:'Które stwierdzenia o <b>Microsoft Entra ID</b> i RBAC są prawdziwe?',o:[['Microsoft Entra ID to nowa nazwa Azure Active Directory',1,'Zmiana nazwy z 2023 r. – to ta sama usługa tożsamości.'],['Conditional Access pozwala warunkowo wymagać MFA lub blokować dostęp',1,'Reguły oparte np. na lokalizacji, urządzeniu, ryzyku.'],['Wbudowane role Azure RBAC to m.in. Owner, Contributor i Reader',1,'Różnią się zakresem uprawnień do zarządzania zasobami.'],['Rola Reader pozwala modyfikować zasoby',0,'Reader może tylko odczytywać.']],tip:'Entra ID = KTO (tożsamość), RBAC = CO może robić (uprawnienia).'},
{p:3,q:'Które stwierdzenia o <b>warstwach dostępu Azure Blob Storage</b> są prawdziwe?',o:[['Hot jest przeznaczona do często używanych danych',1,'Najdroższy storage, ale najtańszy dostęp.'],['Archive to najtańszy storage, ale dane trzeba najpierw przywrócić (rehydratacja)',1,'Dane są offline; odczyt zajmuje godziny.'],['Blob Storage nadaje się do danych niestrukturalnych (pliki, obrazy, logi)',1,'To obiektowy magazyn „na wszystko”.'],['Z warstwy Archive można odczytać dane natychmiast',0,'Najpierw trzeba je przenieść do Hot/Cool/Cold.']],tip:'Im chłodniejsza warstwa, tym tańsze przechowywanie i droższy/wolniejszy dostęp.'},
{p:1,q:'Które stwierdzenia o <b>regionach i strefach dostępności</b> są prawdziwe?',o:[['Availability Zone to fizycznie osobne datacentrum w obrębie regionu',1,'Ma niezależne zasilanie, chłodzenie i sieć.'],['Usługa „zone-redundant” przetrwa awarię jednej strefy',1,'Zasoby są rozłożone na kilka stref.'],['Region to zbiór datacentrów w danej lokalizacji geograficznej',1,'Np. West Europe, Poland Central.'],['Availability Zone to synonim całego regionu',0,'Region zawiera zwykle 3 strefy – strefa to jego część.']],tip:'Region ≥ strefa ≥ datacentrum. Strefy chronią przed awarią datacentrum, pary regionów przed awarią regionu.'},
{p:3,q:'Które stwierdzenia o <b>Azure Functions</b> są prawdziwe?',o:[['Jest to usługa bezserwerowa (serverless) sterowana zdarzeniami',1,'Kod uruchamia się w odpowiedzi na trigger.'],['W planie Consumption płacisz za wykonania i zużyte zasoby',1,'Bez ruchu – prawie bez kosztów.'],['Wyzwalaczem może być m.in. HTTP, Timer, kolejka lub zmiana w Blob',1,'To podstawowe typy triggerów.'],['Wymaga ręcznego zarządzania serwerami i systemem operacyjnym',0,'Właśnie tego unika się w modelu serverless.']],tip:'Serverless ≠ „bez serwerów”, tylko „nie zarządzasz nimi sam”.'},
{p:1,q:'Które z usług Azure działają w warstwie 7 (aplikacji) i potrafią podejmować decyzje na podstawie np. adresu URL?',o:[['Application Gateway',1,'Regionalny load balancer L7 z opcjonalnym WAF.'],['Azure Front Door',1,'Globalny load balancer L7 i CDN.'],['Azure Load Balancer',0,'Działa w L4 (TCP/UDP) i nie analizuje URL.'],['Traffic Manager',0,'Rozkłada ruch na poziomie DNS – nie widzi żądań HTTP.']],tip:'L4: Load Balancer. L7: Application Gateway (region), Front Door (świat). DNS: Traffic Manager.'},
{p:3,q:'Które stwierdzenia o <b>Infrastructure as Code</b> w Azure są prawdziwe?',o:[['Bicep to deklaratywny język kompilowany do szablonów ARM',1,'Czytelniejsza alternatywa dla JSON-owych ARM templates.'],['Szablony ARM są zapisywane w JSON',1,'To natywny format Azure Resource Manager.'],['Terraform może zarządzać zasobami wielu chmur',1,'Stąd popularność w środowiskach multi-cloud.'],['Ręczne klikanie w portalu Azure jest formą IaC',0,'IaC wymaga opisu w kodzie (powtarzalnego i wersjonowanego).']],tip:'IaC = infrastruktura jak kod: wersjonowana, testowalna, powtarzalna.'},
{p:1,q:'Które stwierdzenia o <b>Azure Cosmos DB</b> są prawdziwe?',o:[['To globalnie rozproszona baza NoSQL',1,'Replikacja do wielu regionów jest wbudowana.'],['Oferuje wiele poziomów spójności (od Strong do Eventual)',1,'Pięć poziomów – kompromis między spójnością a opóźnieniem.'],['Udostępnia API m.in. dla MongoDB i Cassandra',1,'Poza natywnym NoSQL, także Gremlin i Table.'],['Jest wyłącznie relacyjną bazą z tabelami i kluczami obcymi',0,'Cosmos to NoSQL; relacyjną usługą jest Azure SQL.']],tip:'Cosmos DB = „NoSQL na skalę świata”, Azure SQL = klasyczny SQL Server jako usługa.'},
{p:3,q:'Które stwierdzenia o <b>kosztach w Azure</b> są prawdziwe?',o:[['Reserved Instances dają rabat za zobowiązanie na 1 lub 3 lata',1,'Opłaca się przy stałym, przewidywalnym obciążeniu.'],['Spot VM są tanie, ale Azure może je wyłączyć',1,'Nadają się do zadań przerywalnych, np. batch.'],['Azure Hybrid Benefit pozwala użyć posiadanych licencji Windows Server/SQL',1,'Zmniejsza koszt maszyn w chmurze.'],['Spot VM gwarantują nieprzerwane działanie',0,'To dokładne przeciwieństwo – mogą być przerwane w każdej chwili.']],tip:'Stałe obciążenie → rezerwacje. Przerywalne → Spot. Nieprzewidywalne → pay-as-you-go.'}
]};
