import LinkGridCard from "./LinkGridCard";

function LinkGrid() {
  const links = [
    {
      title: "MY CUTIE🥧",
      description: " 🩷 🌷 🦄",
      link: "https://vaibhav947.github.io/huvu4.0/",
    },
    {
      title: "OUR MEMORIES",
      description: "You + Me = ❤️",
      link: "https://drive.google.com/drive/folders/1g7wa3ibg-e1opAuPmaCPIhja1dDYsN04?usp=drive_link",
    },
  ];

  return (
    <>
      <div className="grid-container">
        {links.map((link, index) => (
          <LinkGridCard
            key={index}
            title={link.title}
            description={link.description}
            link={link.link}
          />
        ))}
      </div>

      <style jsx>{`
        .grid-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          max-width: 900px;
          margin: 3rem auto;
          flex-wrap: nowrap;
        }

        .grid-container > div {
          flex: 1;
          width: 100%;
          max-width: 350px;
          height: 300px; /* Fixed height for consistent size */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        @media (max-width: 768px) {
          .grid-container {
            flex-wrap: wrap;
          }
          .grid-container > div {
            width: 100%;
            max-width: none;
            height: auto;
          }
        }
      `}</style>
    </>
  );
}

export default LinkGrid;
