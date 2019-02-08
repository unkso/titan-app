# Titan ACL in WCF

## Adding New ACL Options

As Titan evolves, we'll want to create more ACL options. Because we're using
Woltlab's ACP UI to manage assigning ACL groups, it's important to update this
package and install it on the forums in order for all ACL changes to take effect.

The following details how to go about adding new ACL options that Titan can use.

### `aclOption.xml`

This file defines the options that can be assigned to a usergroup and what
object they apply to. 

A new entry in this file should be added when a new ACL option is being
introduced for use with Titan. This will allow us to expose a checkbox in the
ACP UI in successive files.

_Note: The object type is a cheat in the case of Titan because there isn't a
corresponding PHP class/namespace to match. This shouldn't cause an issue._

### `userGroupOption.xml`

This file exposes aclOptions for use in the usergroup editing UI in the WCF
ACP. Adding new entries here exposes them in the ACP so that you can check a box
to allow that usergroup to be authorized for that given resource.

### `language/en.xml`

This is the language file (for localization purposes) that sets the English name
of the given option. Not adding an entry to this file will result in the
fully-qualified namespace name being displayed (i.e. `mod.titan.loaDetails`). 

## End-to-end example of adding and using a new ACL option

Let's suppose, we want to add a new ACL option for viewing _all_ submitted
reports.

First, we'd add a new entry in the `aclOption.xml` file to reflect this:

```xml
<!-- aclOption.xml -->
<option name="canReadAllReports">
    <objecttype>com.unkso.titan.canReadAllReports</objecttype>
</option>
```

This would allow us to expose this option in the `userGroupOptions.xml` file.
Let's suppose, though, that this ACL permission should be an administrator
setting, not a moderator setting. In order to expose this appropriately, we'd
need to add a new category in the `userGroupOption.xml` file as such:

```xml
<!-- userGroupOption.xml -->
<categories>
    <!-- Other entries ommitted for brevity -->
    <category name="admin.titan">
        <parent>admin</parent>
    </category>
</categories>
```

Once we've added this category, we can add a new entry in this category in the
ACP (this is also within the `userGroupOption.xml` file):

```xml
<!-- userGroupOption.xml -->
<options>
    <!-- Other entries ommitted for brevity -->
    <option name="canReadAllReports">
        <categoryname>admin.titan</categoryname>
        <optiontype>boolean</optiontype>
        <defaultvalue>0</defaultvalue>
    </option>
</options>
```

Now, we'll add an entry to the `en.xml` file to display a nice, English,
human-readable name:

```xml
<!-- en.xml -->
<item name="wcf.acp.group.option.category.admin.titan.canReadAllReports"><![CDATA[Can view all submitted reports]]></item>
```

Once done, update the plugin metadata in the `package.xml` as you'd
conventionally do. Then install it via the ACP or the Thunderstorm server to
update the options exposed in the ACP.

For the frontend client to check ACL permissions, they're exposed in the 
following format:

`category_name:option_name`

For the above end-to-end example, you would validate `withACl` against
`admin.titan:canReadAllReports`.

Example:
```jsx harmony
render () {
  return (
    <React.Fragment>
      <WithAcl options={['admin.titan:canReadAllReports']}>
        ...
      </WithAcl>
    </React.Fragment>
  );
}
```
