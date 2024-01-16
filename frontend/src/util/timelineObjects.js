import { yearIndexToYear } from "./yearIndexToYear";

export const YEARS_FROM_1950_TO_NOW = process.env.REACT_APP_END_YEAR - 1950;
export const CURR_YEAR_IN_YEARINDEX = 11950 + YEARS_FROM_1950_TO_NOW;

export const timelineObjects = [
  {
    periodTag: "10000 B.C.E. - 3000 B.C.E.",
    startYear: 0,
    endYear: 7000,
    title: "New Stone Age",
    iconLink: "/icons/stone-axe.svg",
    color: "#15588d",
    periodText: (
      <>
        <p>
          {" "}
          The <strong>Neolithic era (10000 B.C.E. - 3000 B.C.E.)</strong> marked
          humanity's transition from a nomadic hunter-gatherer lifestyle to
          settled agricultural communities. Agricultural practices emerged
          independently in various regions, including the Fertile Crescent,
          China, Mesoamerica, and the Andes.
        </p>
        <p>
          This period saw the domestication of plants like wheat, barley, rice,
          and animals such as goats, sheep, and cattle. The ability to grow
          crops and domesticate animals led to a surplus of food, enabling
          permanent settlements. Notable sites like Çatalhöyük and Jericho
          evidence the establishment of complex societies with social
          hierarchies, specialized labor, and rudimentary trade systems. The
          Neolithic era laid the groundwork for technological advancements like
          pottery-making, weaving, and the construction of megalithic
          structures, indicating a burgeoning understanding of architecture and
          craftsmanship.
        </p>
        <p>
        For more information see <a href="https://www.britannica.com/event/Neolithic">Britannica</a>, <a href="https://pressbooks.bccampus.ca/cavestocathedrals/chapter/neolithic/">Pressbooks</a> or <a href="https://en.wikipedia.org/wiki/Stone_Age">Wikipedia</a>.
        </p>
      </>
    ),
  },
  {
    periodTag: "3000 B.C.E. - 1300 B.C.E.",
    startYear: 7000,
    endYear: 8700,
    title: "The Bronze Age",
    color: "#487386",
    iconLink: "/icons/bow.svg",
    periodText: (
      <>
        <p>
          <strong>The Bronze Age (3000 B.C.E. to 1300 B.C.E.)</strong> marked by the
          use of bronze— an alloy of copper and tin— in tool and weapon
          production. Civilizations in Mesopotamia, Egypt, the Indus Valley, and
          China flourished, contributing to remarkable achievements in urban
          planning, writing systems, and trade networks. Technological
          innovations in bronze metallurgy allowed for the creation of weapons,
          tools, and intricate ornaments.
        </p>
        <p>
          Monumental architectural structures such as the Great Pyramids of
          Giza, the Mesopotamian ziggurats, and the Harappan cities of the Indus
          Valley stand as enduring testaments to this era's engineering
          expertise and cultural achievements. Writing systems, including
          cuneiform and hieroglyphics, facilitated record-keeping and cultural
          exchange, enhancing communication and trade among early civilizations.
        </p>
        <p>
          For more information see <a href="https://www.britannica.com/event/Bronze-Age">Britannica</a>, <a href="https://pressbooks.nscc.ca/worldhistory/chapter/chapter-3-the-bronze-age-and-the-iron-age/">Pressbooks</a> or <a href="https://en.wikipedia.org/wiki/Bronze_Age">Wikipedia</a>. 
        </p>
      </>
    ),
  },

  {
    periodTag: "1300 B.C.E. - 600 B.C.E.",
    startYear: 8700,
    endYear: 9400,
    color: "#2a8983",
    title: "The Iron Age",
    iconLink: "/icons/sword.svg",
    periodText: (
      <>
        <p>
          <strong>The Iron Age (1300 B.C.E. to 600 B.C.E.)</strong> The Iron Age
          marked a pivotal technological leap with the widespread adoption of
          iron tools and weaponry. The development and smelting of iron ore led
          to durable implements that revolutionized agriculture, warfare, and
          craftsmanship. Empires like the Hittites, Assyrians, and Zhou emerged,
          expanding territories and establishing complex administrative
          structures. Iron's affordability and abundance transformed societal
          structures, enabling more widespread access to tools and weapons.
        </p>
        <p>
          This era laid the foundation for significant societal advancements,
          including centralized governance, legal systems, and monumental
          constructions like city walls and temples. The Iron Age witnessed the
          proliferation of diverse cultural traditions and exchange among
          civilizations, facilitating economic growth and technological
          dissemination.
        </p>
        <p>
          For more information see <a href="https://www.britannica.com/event/Iron-Age">Britannica</a>, <a href="https://pressbooks.nscc.ca/worldhistory/chapter/chapter-3-the-bronze-age-and-the-iron-age/">Pressbooks</a> or <a href="https://en.wikipedia.org/wiki/Bronze_Age">Wikipedia</a>. 
        </p>
      </>
    ),
  },
  {
    periodTag: "600 B.C.E. - 500 C.E.",
    startYear: 9400,
    endYear: 10500,
    color: "#719c33",
    title: "The Classical Era",
    iconLink: "/icons/roman.svg",
    periodText: (
      <>
        <p>
          <strong>Classical Era (600 B.C.E. - C.E. 500)</strong> is renowned for
          the intellectual, artistic, and philosophical advancements that
          profoundly shaped Western civilization. Greece and Rome emerged as
          epicenters of cultural flourishing. This period saw the birth of
          philosophical thought by influential thinkers like Socrates, Plato,
          and Aristotle. Philosophical discourse centered on ethics,
          metaphysics, and governance, laying the groundwork for Western
          philosophical traditions. Notable architectural achievements include
          the Parthenon, showcasing Greece's artistic prowess, and the
          Colosseum, emblematic of Roman engineering and entertainment. Roman
          law, with its emphasis on justice and equity, provided a template for
          legal systems in later societies. The period also saw significant
          advancements in literature, with the works of Homer, Sophocles,
          Virgil, and Cicero shaping literary canons for centuries to come. The
          classical arts, including sculpture, pottery, and theater, flourished
          during this epoch, leaving a lasting legacy on subsequent artistic
          expression.
        </p>
        <p>
          For more information see <a href="https://www.britannica.com/event/Classical-antiquity">Britannica</a> or <a href="https://en.wikipedia.org/wiki/Classical_antiquity">Wikipedia</a>. 
        </p>
      </>
    ),
  },
  {
    periodTag: "500 C.E. - 1450 C.E.",
    startYear: 10500,
    endYear: 11450,
    title: "The Middle Ages",
    iconLink: "/icons/castle.svg",
    color: "#f9c232",
    periodText: (
      <>
        <p>
          <strong>The Middle Ages (C.E. 500 - C.E. 1450)</strong> encompass a
          period characterized by socio-political changes, religious influence,
          and technological advancements. Following the fall of the Western
          Roman Empire, Europe experienced a period of decentralized governance,
          feudalism, and the dominance of the Catholic Church. The spread of
          Christianity across Europe fostered cultural unity while influencing
          political structures and societal norms. The Islamic world experienced
          a golden age marked by scientific, cultural, and artistic
          achievements, preserving and translating classical knowledge.
          Technological innovations like the heavy plow, horseshoe, and windmill
          enhanced agricultural productivity. Gothic architecture, exemplified
          by towering cathedrals, showcased advancements in engineering and
          religious fervor. This era also witnessed pivotal moments such as the
          Crusades, the Black Death, and the early signs of the Renaissance,
          with increased trade, urbanization, and a revival in arts and
          learning.
        </p>
        <p>
          For more information see <a href="https://www.britannica.com/topic/history-of-Europe/The-Middle-Ages">Britannica</a> or <a href="https://en.wikipedia.org/wiki/Middle_Ages">Wikipedia</a>. 
        </p>
      </>
    ),
  },
  {
    periodTag: "1450 C.E. - 1750 C.E.",
    startYear: 11450,
    endYear: 11750,
    color: "#f7941d",
    iconLink: "/icons/vitruvian.svg",
    title: "The Early Modern Era",
    periodText: (
      <>
        <p>
          The period from 1450 C.E. to 1750 C.E., known as the{" "}
          <strong>Early Modern Era</strong>, witnessed profound changes in both
          human civilization and the surrounding environments. As societies
          transitioned from medieval to early modern times, a wave of cultural,
          economic, and technological transformations swept across the globe.
        </p>
        <p>
          During this era, advancements in trade and exploration connected
          distant corners of the world, fostering the exchange of ideas, goods,
          and cultures. The emergence of powerful empires, such as the Ottoman
          Empire and Ming Dynasty, reshaped political landscapes, while the
          Renaissance in Europe sparked a revival of art, science, and
          philosophy.
        </p>
        <p>
          Simultaneously, the environment played a crucial role in shaping the
          course of history. The Agricultural Revolution paved the way for
          increased food production, supporting growing populations. However, as
          civilizations expanded, the impact on ecosystems became more
          pronounced, leading to changes in land use and resource exploitation.
        </p>
        <p>
          For more information see <a href="https://history.ceu.edu/early-modern-studies/about">Central European University</a> or <a href="https://en.wikipedia.org/wiki/Early_modern_period">Wikipedia</a>. 
        </p>
      </>
    ),
  },
  {
    periodTag: "1750 C.E. - 1950 C.E.",
    startYear: 11750,
    endYear: 11950,
    color: "#f36523",
    title: "Industrial Revolution",
    iconLink: "/icons/locomotive.svg",
    periodText: (
      <>
        <p>
          <strong>Industrial Revolution (1750 - 1900)</strong> witnessed profound
          transformations in socio-economic, political, and technological
          spheres. The Industrial Revolution, characterized by mechanization and
          mass production, revolutionized manufacturing, transportation, and
          labor. This period saw the rise of capitalism and the shift from
          agrarian economies to industrial economies. Enlightenment ideals of
          reason, liberty, and progress influenced political ideologies and
          social reforms. The American and French Revolutions challenged
          established power structures and advocated for democratic governance
          and individual rights. Scientific advancements, including discoveries
          in electricity, chemistry, and medicine, laid the groundwork for
          modern scientific inquiry. The advent of the steam engine, textile
          machinery, and steel production propelled the Industrial Revolution,
          altering human labor and living standards.
        </p>
        <p>
          For more information see <a href="https://www.britannica.com/topic/modernity">Britannica</a> or <a href="https://en.wikipedia.org/wiki/Modernity">Wikipedia</a>. 
        </p>
      </>
    ),
  },
  {
    periodTag: `1950 C.E. - ${yearIndexToYear(CURR_YEAR_IN_YEARINDEX)}`,
    startYear: 11950,
    endYear: CURR_YEAR_IN_YEARINDEX,
    color: "#ca4c57",
    title: "The Great Acceleration",
    iconLink: "/icons/satellite.svg",
    periodText: (
      <>
        <p>
          <strong>The Great Acceleration (1900 - now)</strong> witnesses rapid
          advancements across various domains, shaping contemporary society. The
          period began with the First and Second World Wars, profoundly altering
          global politics, economies, and social structures. The aftermath of
          these conflicts led to the establishment of international
          organizations like the United Nations, promoting global cooperation
          and diplomacy. The 20th century saw remarkable progress in technology,
          including the advent of automobiles, airplanes, telecommunications,
          and computing. The Space Age marked humanity's exploration beyond
          Earth's boundaries, with space travel and satellite technology
          revolutionizing communication and scientific exploration. The Cold War
          tensions, followed by the collapse of the Soviet Union, reshaped
          geopolitical dynamics. The Great Acceleration also witnessed societal changes,
          including civil rights movements, gender equality advocacy, and
          environmental awareness, influencing cultural norms and policies.
        </p>
        <p>
          For more information see <a href="https://www.britannica.com/topic/postmodernism-philosophy">Britannica</a> or <a href="https://en.wikipedia.org/wiki/Postmodernity">Wikipedia</a>. 
        </p>
      </>
    ),
  },
];
