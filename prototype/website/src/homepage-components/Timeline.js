import { useState } from "react";
import "../styles/Timeline.css";

export default function Timeline({}) {
  const eraStyle = {
    border: "solid",
    flex: 1,
    flexDirection: "column-reverse",
  };

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
      periodText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
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
  const [open, setOpen] = useState(false);
  return (
    <div
      className="timelineObject relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {open && <div className="timelineObjectHoverText">{periodText}</div>}
      {periodTag}
    </div>
  );
};
