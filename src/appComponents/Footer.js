import { Card, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter } from "reactstrap"


const Footer = () => {
    return ( 
<div className="footer">
  <Card>
    <CardFooter className="text-muted">
      Website designed and created from scratch by Ronnie Rogers. <a target="_blank" rel="noopener noreferrer" href="https://github.com/ronniexrogers/salon-app">Github Repo</a>
    </CardFooter>
  </Card>
</div>
     );
}
 
export default Footer;