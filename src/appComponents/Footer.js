import { Card, CardFooter } from "reactstrap"


const Footer = () => {
    return ( 
<div className="footer">
  <Card>
    <CardFooter className="text-muted">
      Website designed and coded by Ronnie Rogers. <a target="_blank" rel="noopener noreferrer" href="https://github.com/ronniexrogers/salon-app">Github Repo</a>
    </CardFooter>
  </Card>
</div>
     );
}
 
export default Footer;