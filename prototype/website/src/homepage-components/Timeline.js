import { useState } from "react";
import "../styles/Timeline.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export default function Timeline() {
  const timelineObjects = [
    {
      periodTag: "1500-1600",
      periodText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
    },
    {
      periodTag: "1600-1700",
      periodText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
    },
    {
      periodTag: "1700-1800",
      periodText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
    },
    {
      periodTag: "1800-1900",
      periodText: (
        <>
          <h1>Halloo</h1>
          <strong>Moos trekt een bak!</strong>
          <p>
            Lit buggin beef chucks fam, bodega cheddar jordans. Bum rush
            doorknocker earrings crib jam, train projects guap fight og. Trees
            gas 40 quarter water. Cheez doodles tropical fantasy. 99cent store
            credit corner store flex. Down low bae cab pump, slang dying
            building loosies 4loko. Apartment blunt koolaid, munchies yo
            lockdown liquor, numbers brother ante. Joint chips sike suspect
            stoop pizza parks. cash eighth jay buckfifty pound thot crime
            neighbors kids. Vans chains gang swishers. 22 blunt hoodrich facts
            808 grind baby daddy chill cipher bomb dealy. Banger crew, 730 benz
            juice, drop science dawg all that chin check, digits G clockin homie
            sauce fiend. Dope flow dis ghetto dime get down waddup cold deuces
            beats. Crackin dip be easy, benjamins faded cop dozens, busta faking
            jacks aight.
          </p>
          <p>
            Booty go off ends baby mama biscuit fly. Freestyle baller grill
            foreals pyt front hard rock gully in game. Fasho shots OD set. Kicks
            hustler grind ice, run it hood vic parlay piece. Jake math, herb one
            love pop, jack mami scrilla player, mack daddy crunk saggin blow
            strapped turn up. Wreck holla serve shank, ut played out L shawty.
            Peace newjack son tax hoodbooger snuff. True dat skeezer up. Spit 44
            hottie zooted. 411 hype man bars, old school downtown ox, wack thick
            whip. Copy kid kickin straight. Toy cop lifted hoodrat.
          </p>
        </>
      ),
    },
    {
      periodTag: "1900-1940",
      periodText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
    },
    {
      periodTag: "1940-1980",
      periodText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
    },
    {
      periodTag: "1980-heden",
      periodText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
    },
  ];
  return (
    <div className="timeline">
      {timelineObjects.map((timelineObject) => {
        return (
          <TimelineObject
            periodTag={timelineObject.periodTag}
            periodText={timelineObject.periodText}
          />
        );
      })}
    </div>
  );
}

const TimelineObject = ({ periodTag, periodText }) => {
  return (
    <OverlayTrigger
      trigger="hover"
      key={"top"}
      placement="top"
      overlay={
        <Popover id={`popover-positioned-top`}>
          <Popover.Header as="h1">{periodTag}</Popover.Header>
          <Popover.Body>{periodText}</Popover.Body>
        </Popover>
      }
    >
      <div className="timelineObject relative">{periodTag}</div>
    </OverlayTrigger>
  );
};
