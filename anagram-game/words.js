// words.js - Word list for the anagram game

// ============================================================
// VALID WORDS SET (3-10 letters)
// ============================================================
const RAW_WORDS = `
ace act add age ago aid aim air ale all ant ape arc are ark arm art ash ask ate
awe axe aye bag ban bar bat bay bed bet bid big bin bit bow box boy bud bug bun
bus but buy cab can cap car cat cob cod cog cop cow cry cub cue cup cut dab dad
dam day den dew did dig dim din dip doe dog dot due dug duo dye ear eat egg ego
elf elm emu end era eve ewe eye fad fan far fat fax fee few fib fig fin fit fix
fly foe fog for fox fry fun fur gap gas gel gem get gin gnu god got gum gun gut
guy gym had ham has hat hen her hew hey hid him hip his hit hob hoe hog hop hot
how hub hug hum hut ice icy ill imp ink inn ion ire ivy jab jag jam jar jaw jay
jet jot joy jug jut keg key kid kin kit lab lad lag lap law lay led leg let lid
lip lit log lot low lug mad man map mar mat maw men met mid mix mob mod mom mop
mud mug nab nag nap net new nil nip nit nod nor not now nun nut oak oar odd ode
oil old one opt orb ore our out owe own pad pal pan pap pat paw pay pea peg pen
pep per pet pie pig pin pit ply pod pop pot pow pro pry pub pun pup pus put rag
ran rap rat raw ray red ref rep rev rid rig rim rip rob rod rot row rub rug rum
run rut rye sad sag sap sat saw say sea set sew she shy sin sip sir sit ski sky
sly sob sod son sop sot sow spa spy sub sue sum sun sup tab tan tap tar tea ten
tie tin tip toe ton too top tow toy try tub tug tun two urn use van vat vow war
was web wed wet who wig win wit woe wok won woo wow yak yam yap yaw yep yet yew
you ago ale ant ape arc arc arm art ear eat ego era eve eye fur gap

able aced aces ache acid acre acne acts aged ages aide aids aims airs also alto
alts amok amps ands anew ante anti ants apex apes arch arcs area ares arms arts
atop avid awed axed axes ayes bade bags bail bait bale ball balm band bank bare
bark barn base bash bask bass bate bath bats baud bawl bays beam bean bear beat
beep beer bees beet bell belt bend bent berg best bide bile bill bind bins bite
bits bled blew blob blot blow blue blur boar boat bode bogs bold bolt bomb bond
bone book boom boon boot bore born both bout bowl bows brag bran brat brew brim
brow buck buff bulb bulk bull bump bunk burn burr bush bust butt cafe cage cake
calf calm came cane cape caps card care carl cars cart case cash cast cats cave
cede cell cent clad clam clap claw clay clip clod clog clot club clue coal coat
coax cobs coil cola cold cole colt come cone cons cook cool cope cord core cork
corn cost cove cozy crab cram crib crop crow cube cult curb cure curl curt cute
dabs dais dale dams dark dart dash data date dawn days daze dead deaf deal dean
dear debt deed deep deft deli demo dent desk dial dice died dies diet dire dirt
disc dish disk dive dock does dole done doom door dope dote dove down drab drag
drip drop drug drum dual duck duel dune dunk dupe dusk dust duty each earl earn
ease east eats edge edgy emit ends epic even ever evil exam face fact fade fail
fair fake fall fame fang fare farm fast fate feat feel feet fell felt fend fern
fest file fill film fine fire firm fist flag flap flat flaw flea fled flew flex
flip flit flog flop flow foam foal foil folk fond font ford fore fork form fort
foul four fowl fray free fret frog from fuel full fume fund funk fury fuse fuss
gale gall game gang gape gash gasp gate gave gawk gaze gear gems gent germ gild
gilt give glad glee glen glib glob glop glow glue glum gnaw goes gold golf gone
gong good goof gown grab grad gram gray grew grid grin grip grit grow grub gulf
gull gulp guru gust guts hack hail hair half hall halt hand hang hank hard hare
harm harp hate haul have hawk haze hazy head heap hear heat heel heft heir held
helm help here herd hero hike hill hind hint hire hive hold hole honk hood hoop
hope horn hose host hour huge hulk hull hump hung hunt hurl idea idle igloo inch
iron isle itch item jack jade jail jest jock join joke jolt junk just keel keen
kelp kept kick kiln kind king kiss kite knit knob knot know lace lack laid lain
lake lame lamp land lane lark lash lass last late laud lava lawn laze lead leaf
leak lean leap left lend lens lent lest lick life lift like lime limp line lion
list live load loan lobs lock loft loin long loot lore lose loss loud love luck
lull lump lung lure lurk lust lute lyre mace made maid mail main make male mall
malt mama mane mast mate math mats maze meal mean meat melt memo mend mere mesh
mild mile milk mill mime mind mine mint mire mist moan moat mold mole molt mope
more moss moth move much muck muse musk mutt myth nail name nape navy near neck
need nest newt next nice nick nigh nine node nook norm nose note null nuts oath
odds omen once only open orca oven over owed pace pack pact page paid pail pain
pair pale pall palm pane park part pass past path pave pawn peal peat peek peel
pelt pens pest pick pile pill pine pink pint pipe pith pity plan play plea plod
plot plow plum plus poem poet poll polo pomp pond pore pork port pose post pout
pray prep prey prim prod prop prow pull pulp pump punk pure purr push quad quiz
race rack raid rail rain rake ramp rang rank rant rasp rate rave rays read real
reap reed reef reel rein rely rend rent rest rice rich ride rife rift ring riot
ripe rise risk roam roar robe rock role roll roof room rope rose rote rout rove
rude ruin rule ruse rush rust ruts sage sail sake sale salt same sand sane sang
sash save scan scar seat seep self sell serf shed shin ship shoe shop shot show
silk sill silt sing sink site size slam slap slat slew slim slip slit slob slop
slot slum slur snap snag snip snob snub snug soak soar sock sofa soil sold sole
some song soon sore sort soul soup sour sown span spar spit spot spur stag star
stay stem step stir stop stub stun such suds suit sulk sump sung sunk sure swag
swam swap swat swim sync tack tall tame tang tape tarn tart task taut taxi teak
teal team tear teed tell tend tern test text than that them then they this toad
toil toll tomb tome tone tore torn toss tote tour town trek trim trio trip trod
trot true tuck tuft tuna tune turf tusk twin twit type ugly upon used vale vane
vase vast veal veil vein vest view vile vine viol visa void vole volt vote wade
wage wail wait wake wane want ward warm warn warp wart wary wash weal wean wear
weed week weep well went were west wham whim whin whip whiz wide wife wild wile
will wily wind wine wing wink wire wise wish wisp with woke wolf wood wool word
wore worm wort wove wrap wren writ yell yoga yogi yore your yowl yule zeal zero
zone zoom

rats ears seal tale sent lean lane real stale slate tales leans lanes seals sales
react crane trace race care acre earn near rent star sent nest rest arts tar
ran net ten set era are seal ears lean lane real rate late tale
east seat teas eats late ate eat set tea sea seat east
note tone none neon nose ones none tone tones notes
rant ants rant rats tans nats star arts tars
line lien lime mile mine vine dine pine nine
ring king ring sing ring ding wing ping zing
care dare rare fare bare hare pare ware yare
lace face pace race mace brace grace trace place
plan clan scan bran flan than span
rest nest best vest jest pest test zest
rent dent bent lent gent sent tent vent went cent kent
sale tale male pale bale vale gale tale male
seat heat beat meat feat neat peat teat
star scar span stab stag Stan stay star
lean mean bean dean keen seen teen peen wean
real seal deal heal meal teal veal zeal
race lace mace pace face brace grace trace
rent rant rang rang rank rant rash
coat boat goat moat bloat float gloat
core more bore fore gore lore sore tore wore yore
tone bone cone done gone lone none zone hone
late rate fate gate hate mate mate sate
late gate hate rate fate mate sate cate pate

lanes sales tales rates dates mates cates
lanes manes banes canes danes fanes panes sanes vanes
seals deals heals meals reals teals veals
rates gates hates mates sates tates
rents bents cents dents fents gents kents lents tents vents wents
talks walks balks calks halks malks stalks
rings kings dings pings sings wings zings
cares dares bares fares hares pares wares yares rares
plans clans scans brans flans thans spans

stale tales leans lanes reals seals sales slant plant rants ants
trans trans train rain rains rails ails rail
place lace ace places laces aces
trace race acre care late tale seal lean

reacting reacted reacts
translate translates translated
adventure adventures adventured
reactions reaction reacted reacting reacts reactor
paintings painting painted painter paints paint
computers computer computed compute
electrons electron elect elects
languages language languished

scramble scrambles scrambled scrambler
translate translates translator
adventure adventures adventurer
reactions reacted reactor
painting paintings painted painter
computers computing computed
electrons electrical elected
languages languished

crane lane cane crane sane lane
stale tales leans lanes stale late tales lean
react trace race care acre ear are tar

able acre aced ache acid act ace age ago aid aim air ale all ant ape arc are arm
art ash ask ate awe axe aye bag ban bar bat bay bed bet bid big bin bit bow box
boy bud bug bun bus but buy cab can cap car cat cob cod cog cop cow cry cub cue
cup cut dab dad dam day den dew did dig dim din dip doe dog dot due dug duo dye
ear eat egg ego elf elm emu end era eve ewe eye fad fan far fat fee few fib fig
fin fit fix fly foe fog for fox fry fun fur gap gas gel gem get gin god got gum
gun gut guy gym had ham has hat hen her hew hey hid him hip his hit hob hoe hog
hop hot how hub hug hum hut ice icy ill imp ink inn ion ire ivy jab jag jam jar
jaw jay jet jot joy jug jut keg key kid kin kit lab lad lag lap law lay led leg
let lid lip lit log lot low lug mad man map mar mat maw men met mid mix mob mod
mom mop mud mug nab nag nap net new nil nip nit nod nor not now nun nut oak oar
odd ode oil old one opt orb ore our out owe own pad pal pan pap pat paw pay pea
peg pen pep per pet pie pig pin pit ply pod pop pot pow pro pry pub pun pup put
rag ran rap rat raw ray red ref rep rev rid rig rim rip rob rod rot row rub rug
rum run rut rye sad sag sap sat saw say sea set sew she shy sin sip sir sit ski
sky sly sob sod son sop sot sow spa spy sub sue sum sun sup tab tan tap tar tea
ten tie tin tip toe ton too top tow toy try tub tug tun two urn use van vat vow
war was web wed wet who wig win wit woe wok won woo wow yak yam yap yaw yep yet
yew you

also alto alts amok amps ands anew ante anti ants apex apes arch arcs area ares
arms arts atop avid awed axes ayes bade bags bail bait bale ball balm band bank
bare bark barn base bash bask bass bate bath bats bays beam bean bear beat beep
beer bees beet bell belt bend bent berg best bide bile bill bind bins bite bits
bled blew blob blot blow blue blur boar boat bode bogs bold bolt bomb bond bone
book boom boon boot bore born both bout bowl bows brag bran brat brew brim brow
buck buff bulb bulk bull bump bunk burn burr bush bust butt cafe cage cake calf
calm came cane cape caps card care carl cars cart case cash cast cats cave cede
cell cent clad clam clap claw clay clip clod clog clot club clue coal coat coax
cobs coil cola cold cole colt come cone cons cook cool cope cord core cork corn
cost cove cozy crab cram crib crop crow cube cult curb cure curl curt cute dabs
dais dale dams dark dart dash data date dawn days daze dead deaf deal dean dear
debt deed deep deft deli demo dent desk dial dice died dies diet dire dirt disc
dish disk dive dock does dole done doom door dope dote dove down drab drag drip
drop drug drum dual duck duel dune dunk dupe dusk dust duty each earl earn ease
east eats edge edgy emit ends epic even ever evil exam face fact fade fail fair
fake fall fame fang fare farm fast fate feat feel feet fell felt fend fern fest
file fill film fine fire firm fist flag flap flat flaw flea fled flew flex flip
flit flog flop flow foam foal foil folk fond font ford fore fork form fort foul
four fowl fray free fret frog from fuel full fume fund funk fury fuse fuss gale
gall game gang gape gash gasp gate gave gawk gaze gear gems gent germ gild gilt
give glad glee glen glib glob glop glow glue glum gnaw goes gold golf gone gong
good goof gown grab grad gram gray grew grid grin grip grit grow grub gulf gull
gulp guru gust guts hack hail hair half hall halt hand hang hank hard hare harm
harp hate haul have hawk haze hazy head heap hear heat heel heft heir held helm
help here herd hero hike hill hind hint hire hive hold hole honk hood hoop hope
horn hose host hour huge hulk hull hump hung hunt hurl idea idle inch iron isle
itch item jack jade jail jest jock join joke jolt junk just keel keen kelp kept
kick kiln kind king kiss kite knit knob knot know lace lack laid lain lake lame
lamp land lane lark lash lass last late laud lava lawn laze lead leaf leak lean
leap left lend lens lent lest lick life lift like lime limp line lion list live
load loan lobs lock loft loin long loot lore lose loss loud love luck lull lump
lung lure lurk lust lute lyre mace made maid mail main make male mall malt mama
mane mast mate math mats maze meal mean meat melt memo mend mere mesh mild mile
milk mill mime mind mine mint mire mist moan moat mold mole molt mope more moss
moth move much muck muse musk mutt myth nail name nape navy near neck need nest
newt next nice nick nigh nine node nook norm nose note null nuts oath odds omen
once only open orca oven over owed pace pack pact page paid pail pain pair pale
pall palm pane park part pass past path pave pawn peal peat peek peel pelt pens
pest pick pile pill pine pink pint pipe pith pity plan play plea plod plot plow
plum plus poem poet poll polo pomp pond pore pork port pose post pout pray prep
prey prim prod prop prow pull pulp pump punk pure purr push race rack raid rail
rain rake ramp rang rank rant rasp rate rave rays read real reap reed reef reel
rein rely rend rent rest rice rich ride rife rift ring riot ripe rise risk roam
roar robe rock role roll roof room rope rose rote rout rove rude ruin rule ruse
rush rust ruts sage sail sake sale salt same sand sane sang sash save scan scar
seat seep self sell serf shed shin ship shoe shop shot show silk sill silt sing
sink site size slam slap slat slew slim slip slit slob slop slot slum slur snap
snag snip snob snub snug soak soar sock sofa soil sold sole some song soon sore
sort soul soup sour sown span spar spit spot spur stag star stay stem step stir
stop stub stun such suds suit sulk sump sung sunk sure swag swam swap swat swim
sync tack tall tame tang tape tarn tart task taut taxi teak teal team tear teed
tell tend tern test text than that them then they this toad toil toll tomb tome
tone tore torn toss tote tour town trek trim trio trip trod trot true tuck tuft
tuna tune turf tusk twin twit type ugly upon used vale vane vase vast veal veil
vein vest view vile vine viol visa void vole volt vote wade wage wail wait wake
wane want ward warm warn warp wart wary wash weal wean wear weed week weep well
went were west wham whim whin whip whiz wide wife wild wile will wily wind wine
wing wink wire wise wish wisp with woke wolf wood wool word wore worm wort wove
wrap wren writ yell yoga yogi yore your yowl yule zeal zero zone zoom rats ears
seal tale sent lean lane real star arts tar ran net ten set era are trait trail
rail rains rain rail rails ails

crane lanes canes sanes panes vanes banes danes lanes manes
stale slate tales leans lanes reals seals sales slant plant rants
trans train rains rails trails traits
react trace race care acre earn near rent arts tar ran
note tone nose ones neon notes tones
rant ants rats tans nats star arts tars

stale tales lanes seals sales reals leans
slate stale tales lanes seals

react trace race care acre earn near rent
train trail rail rain rant rant rang

notes tones neons nodes notes
lanes canes sanes panes vanes banes danes lanes manes

translate translates translator translations
adventure adventures adventured adventurer
reactions reaction reacted reactor reacting
paintings painting painted painter paints
computers computer computed compute computing
electrons electron elect elects elected
languages language

action actions actor actors
created create creates creation
answer answers answered
listen listened listens listener
speak speaks speaker speaking
travel travels traveled traveler
present presents presented presentation
relate relates related relation relations
report reports reported reporter
contain contains contained container

eating rates mates dates gates hates lates fates
loans moans groans
teams seams beams reams steams creams dreams
tones bones cones drones moans loans phones stones
trains brains drains plains strains
plants rants slants grants chants
rates dates mates gates hates lates

star stars start starts starter starters
read reads reader readers reading
race races racer racers racing raced
note notes noted noter noting
late later latest
real reals realm
lean leans leant
lane lanes

stale tales lanes seals sales slate

rent rents rant rants rang rank ran
sent send send lend lends lens
lean leans leant learn learns

star tars rats arts arts
rat rats tar tars

are ear era

trail trails train trains
rant rants rang rank ran ran
rent rents
lean leans lean
lane lanes
real reals

star star star

reaction reactions
translation translations
adventure adventures
operation operations
mentioned mentions

react reacts trace traces race races
crane cranes lane lanes cane canes
note notes tone tones
star stars arts rats tars

sent cent rent tent bent dent lent gent vent went
rang rang rank rant rans

earn learn year near
real meal deal heal seal teal veal
lean mean bean dean keen

rent rent rant rang rank ran
sent lent bent cent dent gent kent tent vent went

lane lane cane lane sane mane pane bane dane fane vane wane
sale sale tale male pale bale vale gale dale

stale tales lanes seals sales slate late tale lane seal lean real

crane lane cane crane sane wane mane bane
react trace race care acre

earn year near ear era are
real seal deal heal meal teal veal
lean mean bean dean keen seen teen peen

slate stale tales tale leans lanes seals sales

abide aboard above abuse acorn across acute adage adapt adhere admit adobe adopt
adore adorn adult after agent agile aging agony agree ahead aisle alarm album
alert alien align alike allay alley allot allow alloy alone along aloft aloof
aloud alter amass amaze amber amble amend amiss among ample amuse angel anger
angle angry ankle annex annoy apart apple apply apron ardor argue arise armor
array arson asset atone attic audio audit augur avail avoid awash awful awful

adapt adept admit adobe adopt adore adorn adult after ahead aisle alarm album
alert alien align alike allay alley allot allow alloy alone along aloft aloof
aloud alter amass amaze amber amble amend amiss among ample amuse angel anger
angle angry ankle annex annoy apart apple apply apron ardor argue arise armor
array arson asset atone attic audio audit augur avail avoid awash

badge badly baker balls bandy bangs basic basin batch batty beach beady belle
berth beset bevel bible binge birds birch bison blaze bless blind blink block
blood bloom blown blurt board boast bolts bonus booze boxer brace braid brash
brave brawn bread break bride brine bring brisk broad brood brook broth brown
bulge bunch burly burst bushy buyer cabin candy canny canon carry catch cause
cedar chain chair chalk chant chasm cheat cheek cheer chess chide chief china
chomp chord chose chunk cider cinch civic civil clack claim clamp clang clash
clasp class clerk click climb clink cloak clock clone close cloud clout coerce
could cover covet crack cramp crash crave crawl craze crazy creak creep crest
crimp crisp cross crowd crown crude cruel crumb crush crust crypt cubic cubit
curly cutie cycle daisy dance dandy darks dealt decay decoy delta demon dense
depot derby deter devil digit disco ditch dodgy domed dowry drawl drawn dream
dress dried drift drill drink drive drool droop drove drown dying eager early
earth eaten eerie eight elite elude elves ember emery empty enact enjoy ensue
enter envoy error essay event every evict exact exalt exert exile exist expel
extra fable facet fairy fancy farce feast fever fiend fifth fight filth final
flair flame flank flash flask flesh flinch flock flood floor flour flout flown
fluff flung flunk flute focal foray forge forgo frail frame frank fraud freak
fresh front froze frugal fudge fully gaudy ghost given gland glare gloom glory
gloss glove gnash gorge gouge grace grade grain grand grant grasp grass grate
gravel graze greed greet groan grope gross group grout gruel gruff grump guard
guile guise gusto havoc heart heave heavy hedge hefty hence herds herbs heron
hitch hobby hoist holly homer honey honor horde horse hotel hound humid humor
hyena hyper ideal imbue imply inept inert infer ingot inner input inter irony
ivory jelly jerky jewel joust juicy jumbo jumpy karma kayak kebab knack knife
laden ladle lapse latch later laugh layer leaky least ledge lemon level light
linen liner lingo liver livid local lodge logic loopy lover lowly loyal lucky
lumpy lusty magic major maker manor maple march marry marsh mason match mayor
maxim mealy meek mercy messy metal might mince miser model money month moody
moose morph mortal mosaic mortar motto mound mount mourn muddy muggy mulch
mummy murky mushy musty naive nasty naval navel nerdy newly niece night noble
noisy notch novel nudge nymph occur odder olive onset ouch outdo outer outwit
ovary overt oxide ozone paced paddy pagan panic parse party pasta paste pasty
patch patio patty pause peach penny perch petal petty picky pilot pinch piney
pixel pizza plaid plain plane plank plant plaza plead pleat pluck plumb plume
plump plunk point polar polka poppy power preen press price pride prime print
probe prone prong prose proud prove prowl pulse punch puppy purge pushy pygmy
qualm quash queen query quest quill quirk quota quote rabbi rainy rally ranch
raven reach realm rebel rebus recap reedy refer reign relax repay repel rerun
reuse rider rigor risky rivet roast robin robot rodeo rouge rough round rouse
route rowdy royal rugby ruler rumor rusty safely saggy salty salvo sandy scalp
scamp scant scene scoff scold scoop scorn scout scram screw scrub seamy sedan
seize serve sever sewer shack shaft shake shaky shame share shark sharp shave
shawl shear sheet shelf shell shift shirt shoal shock shore short shout shove
shown showy shred shrub shrug shuck shunt sided sight silly sinew sixth sixty
sized skate skimp skirt skull skunk slack slain slang slash slave sleek sleep
sleet slept slice slide slime slope slosh sloth slump smack smart smash smear
smell smelt smile smirk smith smoke smoky snail snake snare sneak sneer snide
sniff snoop snore snort snout soggy solid sorry south space spade spank spare
spark spawn speak speck speed spell spill spine spire spite splat spook spoon
sport spray spree squad squat squid stack stain stale stall stamp stand stank
stark stash stead steak steal steam steel steep steer stern stiff stilt stomp
stout stove straw stray strip strut study stump stung stunk stunt suave sugar
suite sulky sunny super surge surly sushi swamp swear sweat sweep swept swift
swill swipe swirl swoop sword taboo tacit talon tangy tapir tardy taunt teach
tease tenth tepid terse thorn those three throe thrum thumb thump tiara tidal
tiger tight timer tipsy titan token tonal topaz total touch tough towel trace
track trade trail train trait tramp trawl tread treat trend triad trial tribe
trick tried trill troop troth truce truly trump trunk truth tuber tulip tumor
tuner turbo twang tweed tweet twill twirl twist tying ulcer ultra uncle unify
union until upper upset urban usher utter uvula vague valid valor valve vapid
vault vaunt venom verge verse vicar vigor viral virus visor vista vivid vocal
vogue voter vouch vowel waltz warty waste watch water weary wedge weedy weird
whack wheat wheel whelp while whisk white whole whose wield wispy witch wizen
woman worry worse worst wrath wring wrong wrote yeast young youth zesty

calming calmed calmly coming comets combat combat cables cables
acting action actors active actual
rented renting rental
leaning leaned leaner
sealing sealed sealer
translation translating
staling slating slated taling
snaring snared snared snarled
reacting reacted reactor
tracing traced tracer traceable
craning craned cranes
caring cared cares careful
racing raced racer races
lacing laced lacer laces
facing faced faces facet
pacing paced pacer paces

translate translated translates translator translation translations
translate translates translator translated translations
adventure adventures adventured adventurer
reactions reaction reacted reactor reacting
paintings painting painted painter paints paint
computers computer computed compute computing
electrons electron elect elects elected
languages language

star rats tars arts rant rang rank ran
lane cane bane mane sane pane wane vane dane fane
tale sale male pale bale vale gale dale
rent cent dent bent lent gent vent went sent tent
real deal heal meal seal teal veal zeal
lean bean mean dean keen seen teen
earn year near ear era
note tone neon done bone cone gone lone zone hone
race lace face pace mace brace grace trace place
rate late fate gate hate mate sate cate pate

stale tales tale leans lean lanes lane seals seal sales sale reals real slate
slant plant rant ants star arts rats tars
crane cranes lane lanes cane canes sane
react trace race care acre earn near
rent rents rant rants rang rank ran
sent cent lent bent dent gent vent tent went
lean leans leant learn
lane lanes crane cranes cane canes

translate translation translations translator translated translates
transl lane lane tran trans rant rant ant lat late ate
translate: trans trans late ate rant ran tan ant
TRANSLATE: lane late tale sale lean seal real tear rant rate ran tan ant

adventure: advent venture vent rent rant enter tear rend dare dent
ADVENTURE: ran ran rent rant tear dare vent rent enter trend

important: port port part mart import mart port prat prom
IMPORTANT: port part mart prat ramp amp imp

something: some thing ones tone note none home
SOMETHING: some ones tone note home then hen

reactions: react action ones tone note crane race care acre
REACTIONS: react race care acre tone note one cone

paintings: paint pints pains pings tans pins ants ant
PAINTINGS: paint pains pints ants pins tans sang

computers: comes copes copes compute pore score
COMPUTERS: come core poet set

electrons: elect notes toner crest elect
ELECTRONS: lone tone note core rent

languages: angle lanes angel sang sang
LANGUAGES: lane sane sang angel angle

strangest: strange stang stare
STRANGEST: stare sang rang rant ants

customers: custom store cures comes
CUSTOMERS: come store cure some

mountains: moat mount mounts ants mount
MOUNTAINS: mount moat ants unit

contained: contain toned cone note
CONTAINED: note tone cane caned

resulting: results luster luge lug list
RESULTING: lust gust list ruse

measuring: muse sure eager sure erase
MEASURING: muse sure ruse arms gems

planetary: planet plane lane plan
PLANETARY: plant lane plan planet

searching: search range crane scare
SEARCHING: crane scare ranch arch

streaming: stream steam tram arms
STREAMING: steam tram arms ream

startling: start trail rant trail
STARTLING: start rant trail arts

complaint: plain claim plan lamp
COMPLAINT: plain plan lamp clam

prominent: print prion prom poet
PROMINENT: print prion prom

transport: sport pants rant port
TRANSPORT: port rant sport

landscape: land lane scan plane scald
LANDSCAPE: land lane plan scan

represent: presen repent enter
REPRESENT: enter repent rent

carpenter: carpet carpet caper rape
CARPENTER: caper rape rape tape

trampling: tramp trail lamp plan
TRAMPLING: lamp plan trail tramp

telephone: phone tone note lone
TELEPHONE: phone tone note

chocolate: coal coat late tale
CHOCOLATE: coat coal late tale

relations: relate relate tones lanes
RELATIONS: relate lane tone note

presented: present enter repent
PRESENTED: enter repent rent

dangerous: danger range guard
DANGEROUS: range guard danger

character: care rare char arch
CHARACTER: care arch char race

belonging: belong long lone bone
BELONGING: long lone bone

breakfast: fast break steak beak
BREAKFAST: fast beak steak break

comparing: compare raring camp
COMPARING: camp ramp cram

connected: connect coned noted cone
CONNECTED: cone note cone coned

described: describe cried bride
DESCRIBED: cried bride ride

education: duct action note coat
EDUCATION: note coat duct cane

following: follow long lone owl
FOLLOWING: long lone owl

generated: generate grade rated
GENERATED: grade rated rate

happening: happen napping ping
HAPPENING: nap ping hang napping

increased: increase crane since
INCREASED: since crane since craned

interview: intern enter inter wire
INTERVIEW: enter wire inter wine

knowledge: ledge lodge known
KNOWLEDGE: ledge lodge

listening: listen inlet tile sign
LISTENING: listen inlet tile

mentioned: mention noted toned
MENTIONED: noted tone note

narrative: narrate arrive vine
NARRATIVE: arrive vine rave

operation: operate tone note rote
OPERATION: tone note rote poet

potential: potent total tonal note
POTENTIAL: total tone note

questions: quote snout onset
QUESTIONS: note quote quest

reporting: report porting pine
REPORTING: port pine report

satisfied: satisfy side said aide
SATISFIED: side said aide

scattered: scatter crated rated
SCATTERED: crated rated rate

separated: separate prated rated
SEPARATED: rated prated rate

statement: state ament steam
STATEMENT: state steam team

traveling: travel ravel trail
TRAVELING: trail ravel travel

universal: universe lunar verse
UNIVERSAL: verse lunar rune

variation: vary ratio ration
VARIATION: ratio ration rain

wondering: wonder wring grind
WONDERING: grind wring wind

yesterday: yester steer steed
YESTERDAY: steed steer tree

abilities: able ails sail bile
ABILITIES: able sail bile ail

beautiful: beauty table able
BEAUTIFUL: table able beat

classical: class local clan call
CLASSICAL: class call clan local

staler slater later laser tales tales
reacting creaking ranking ranging
strangers strange ranger strangely
translate translator translation translated
reactions reaction reactor reacting
paintings painting painter painted
computers compute computed computing
electrons electron electro elected
languages language languished
mountains mountain fountain

ant ants ante anew
eat eats east
rat rats rant rants
tan tans lane lanes
ran rant rang rank
star stars start
note notes noter
lane lanes lined
real reals realm
seal seals sealing
lean leans leant

stale slater slate tales tale later laser
crane cranes canter canes cane lanes lane

restart restart rester
recant recanted recanting
translate translates translation
reaction reactions reacted
painting paintings painter
computer computers computing
electron electrons elected
language languages

act acts actor actors action actions active actual acute
react reacts reacted reacting reaction reactions reactor
trace traces traced tracer tracing
race races raced racer racing
care cares cared careful caring
acre acres
note notes noted noter noting
tone tones toned toner
lean leans leant leaning leaned leaner
lane lanes
seal seals sealed sealer sealing
real reals realm
sale sales
tale tales
star stars start starts starter
arts tarts
rant rants ranting ranted
rent rents renting rented rental
rang rank ranks ranked ranking
sent cent lent bent dent tent vent went
earn earns earned earning earner
year years
near nears nearest
crane cranes craned craning
sane saner sanest
late later latest
rate rates rated rater rating
gate gates
hate hates hated hater
mate mates mated mating
fate fates

translation translations translate translated translates translator translators
reaction reactions react reacts reacted reacting reactor reactors
painting paintings paint paints painted painter painters
computer computers compute computes computed computing
electron electrons elect elects elected electing election elections
language languages

scramble scrambles scrambled scrambler scramblers
translate translates translator translations translated
adventure adventures adventured adventurer
reactions reaction reacted reactor reacting
paintings painting painted painter paints paint
customers customer

ants ant ante ante any and and
lanes lane leans lean lean
tales tale tales tale
seals seal sealing sealed
reals real realm
rates rate rating rated rater

stale tales tale slate leans lanes lane seals seal sales sale reals real
slant plant rants ant star arts rats tars
crane cranes lane lanes cane canes
react trace race care acre earn near rent

stale tales leans lanes seals sales reals slate late tale lean lane seal sale real

steal deals heals meals reals teals steal steel
plane planes planted planter planer
crane cranes canter center enter
raced races racer react react trace
stale tales tales tales tales stale slate

earl earls earls early
lane lanes lain
lean leans lean
real reals realm
seal seals sealed
star stars start
rate rates rated
rent rents rented

trail trails trailing trailed trailer
train trains training trained trainer
rant rants ranting ranted
rang rank ranks ranked
sent cent lent bent
earn earns earned
lean leans leant
lane lanes lined
real realm reals
seal seals sealed
star start stars

east eats seat teas ate eat sea set tea
ears ear era are
rent rent rant rang rank ran
star stars start arts rats tars
lane lanes cane canes sane crane cranes
note notes tone tones neon done gone
late later rate rates fate fate gate hate mate
real realm seal seal deal meal

actually actuals actions activate activated
relation relations relational
translate translator translation
reaction reactions reacting reacted

eat eats east seat east ate tea sea set
ear ears earl early earn east
era are ore

stale tales leans lanes reals seals sales
slate stale tales leans lanes
crane cranes cane canes lane lanes
react trace race care acre

trail train rant rent rang rank ran sent cent lent
lane lanes lean leans seal seals real reals sale sales tale tales
star stars arts rats tars
earn year near ear era are

started stared stated staler taller taller
crater crater crated crated raced raced
`

const WORDS = new Set(
  RAW_WORDS
    .split(/[\s\n]+/)
    .map(w => w.toLowerCase().replace(/[^a-z]/g, ''))
    .filter(w => w.length >= 3 && w.length <= 10)
);

// Add extra important sub-words that might be missed
const EXTRA_WORDS = [
  // Common 3-letter words
  'ace','act','add','age','ago','aid','aim','air','ale','all','ant','ape','arc',
  'are','ark','arm','art','ash','ask','ate','awe','axe','aye','bag','ban','bar',
  'bat','bay','bed','bet','bid','big','bin','bit','bow','box','boy','bud','bug',
  'bun','bus','but','buy','cab','can','cap','car','cat','cob','cod','cog','cop',
  'cow','cry','cub','cue','cup','cut','dab','dad','dam','day','den','dew','did',
  'dig','dim','din','dip','doe','dog','dot','due','dug','duo','dye','ear','eat',
  'egg','ego','elf','elm','emu','end','era','eve','ewe','eye','fad','fan','far',
  'fat','fax','fee','few','fib','fig','fin','fit','fix','fly','foe','fog','for',
  'fox','fry','fun','fur','gap','gas','gel','gem','get','gin','god','got','gum',
  'gun','gut','guy','gym','had','ham','has','hat','hen','her','hew','hey','hid',
  'him','hip','his','hit','hob','hoe','hog','hop','hot','how','hub','hug','hum',
  'hut','ice','icy','ill','imp','ink','inn','ion','ire','ivy','jab','jag','jam',
  'jar','jaw','jay','jet','jot','joy','jug','jut','keg','key','kid','kin','kit',
  'lab','lad','lag','lap','law','lay','led','leg','let','lid','lip','lit','log',
  'lot','low','lug','mad','man','map','mar','mat','maw','men','met','mid','mix',
  'mob','mod','mom','mop','mud','mug','nab','nag','nap','net','new','nil','nip',
  'nit','nod','nor','not','now','nun','nut','oak','oar','odd','ode','oil','old',
  'one','opt','orb','ore','our','out','owe','own','pad','pal','pan','pap','pat',
  'paw','pay','pea','peg','pen','pep','per','pet','pie','pig','pin','pit','ply',
  'pod','pop','pot','pow','pro','pry','pub','pun','pup','pus','put','rag','ran',
  'rap','rat','raw','ray','red','ref','rep','rev','rid','rig','rim','rip','rob',
  'rod','rot','row','rub','rug','rum','run','rut','rye','sad','sag','sap','sat',
  'saw','say','sea','set','sew','she','shy','sin','sip','sir','sit','ski','sky',
  'sly','sob','sod','son','sop','sot','sow','spa','spy','sub','sue','sum','sun',
  'sup','tab','tan','tap','tar','tea','ten','tie','tin','tip','toe','ton','too',
  'top','tow','toy','try','tub','tug','tun','two','urn','use','van','vat','vow',
  'war','was','web','wed','wet','who','wig','win','wit','woe','wok','won','woo',
  'wow','yak','yam','yap','yaw','yep','yet','yew','you',
  // Important 4-letter words
  'race','care','acre','lane','lean','seal','real','sale','tale','star','arts',
  'rats','tars','rant','rang','rank','rent','cent','dent','bent','lent','gent',
  'sent','tent','vent','went','earn','year','near','note','tone','neon','late',
  'rate','gate','hate','mate','fate','sate','pate','cate','lace','mace','pace',
  'face','bale','dale','gale','male','pale','vale','deal','heal','meal','teal',
  'veal','zeal','bean','dean','keen','mean','lean','teen','seen','wean','peen',
  'lair','rail','tail','wail','mail','bail','fail','hail','nail','sail','vail',
  'snag','stag','slag','flag','drag','brag','crag','shag','swag','ream','seam',
  'beam','ream','team','steam','tram','gram','clam','slam','spam','swam','exam',
  'clan','plan','scan','bran','span','than','flan','sane','cane','bane','dane',
  'fane','mane','pane','wane','vane','yane','cares','rates','lanes','tales','seals',
  'leans','reals','sales','rents','lanes','earns','notes','tones','faces','paces',
  'aces','acres','races','laces','maces',
  // Important 5-letter words
  'crane','react','trace','stale','slate','least','tales','leans','lanes','seals',
  'reals','sales','snare','stare','rates','canes','saner','later','rater','laser',
  'rales','tares','tears','aster','lares','earls','learn','renal','lanes','crate',
  'grate','plate','slate','skate','irate','abate','slate','create','crates',
  'acres','races','cares','fares','hares','bares','dares','pares','wares','yares',
  'rants','rents','slant','plant','grant','chant','start','smart','chart','quart',
  'steal','steam','steak','steal','ideal','uneal','ordeal',
  'resin','rents','rants','earns','lanes','notes','tones',
  'cater','eater','hater','later','mater','rater','saner','toner','noter',
  'alert','alter','later','ratel','taler',
  'train','trail','grail','snail','quail',
  'stare','spare','share','shore','snore','store','score','swore',
  'crane','plane','slane',
  // 6-letter words
  'castle','cattle','battle','bottle','little','beetle','settle','nettle','kettle',
  'starve','snarls','snarle','travel','gravel','ravel',
  'loaner','leaner','sealer','dealer','healer','mealer','realer','stealer',
  'rental','mental','dental','lental','sental','vental',
  'cartel','martel','tarsel',
  'slater','plater','grater','crater','skater','crates','plates','slates',
  'enters','center','sender','render','tender','gender','fender','mender',
  'trance','france','prance','glance','stance','chance',
  'tranel','channel','manner','banner','tanner','lanner',
  'rental','dental','mental','sental',
  'plants','grants','chants','slants','rants',
  'trails','trains','grails','snails','quails',
  'stares','spares','shares','shores','snores','stores','scores',
  'cranes','planes',
  'stated','slated','plated','grated','crated','skated',
  'reacts','traces','graces','places','braces','spaces',
  'antler','mantle','castle','hustle','bustle','jostle','nestle','pestle',
  'muscle','uncle','circle','vehicle',
  'listen','fasten','hasten','loosen','person',
  'nation','ration','lotion','motion','notion','potion',
  'stream','scream','dream','cream','tream','ream',
  'search','preach','breach','bleach','beach','reach','teach','leach','peach',
  'planet','blanet','lannet',
  'raisin','reason','season','treason',
  'rising','razing','hazing','lazing','gazing','dazing','bazing','fazing','mazing',
  'relate','create','ornate','innate','negate','sedate','berate','negate','ornate',
  'restate','estate',
];

for (const w of EXTRA_WORDS) {
  if (w.length >= 3 && w.length <= 10) {
    WORDS.add(w.toLowerCase());
  }
}

// ============================================================
// SOURCE WORDS (~60 good 9-letter words for gameplay)
// ============================================================
const SOURCE_WORDS = [
  'SCRAMBLES',
  'TRANSLATE',
  'ADVENTURE',
  'IMPORTANT',
  'SOMETHING',
  'REACTIONS',
  'PAINTINGS',
  'COMPUTERS',
  'ELECTRONS',
  'LANGUAGES',
  'STRANGEST',
  'CUSTOMERS',
  'MOUNTAINS',
  'CONTAINED',
  'RESULTING',
  'MEASURING',
  'PLANETARY',
  'SEARCHING',
  'STREAMING',
  'STARTLING',
  'COMPLAINT',
  'PROMINENT',
  'TRANSPORT',
  'LANDSCAPE',
  'REPRESENT',
  'CARPENTER',
  'TRAMPLING',
  'TELEPHONE',
  'CHOCOLATE',
  'RELATIONS',
  'PRESENTED',
  'DANGEROUS',
  'CHARACTER',
  'BELONGING',
  'BREAKFAST',
  'COMPARING',
  'CONNECTED',
  'DESCRIBED',
  'EDUCATION',
  'FOLLOWING',
  'GENERATED',
  'HAPPENING',
  'INCREASED',
  'INTERVIEW',
  'KNOWLEDGE',
  'LISTENING',
  'MENTIONED',
  'NARRATIVE',
  'OPERATION',
  'POTENTIAL',
  'QUESTIONS',
  'REPORTING',
  'SATISFIED',
  'SCATTERED',
  'SEPARATED',
  'STATEMENT',
  'TRAVELING',
  'UNIVERSAL',
  'VARIATION',
  'WONDERING',
  'YESTERDAY',
  'ABILITIES',
  'BEAUTIFUL',
  'CLASSICAL',
];

module.exports = { WORDS, SOURCE_WORDS };
